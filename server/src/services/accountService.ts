import emailService from './emailService';
import tokenService from './tokenService';
import UserCreateDto from '../models/dto/userCreate.dto';
import UserLoginDto from '../models/dto/userLoginInput.dto';
import TokenPayloadDto from '../models/dto/tokenPayload.dto';
import bcrypt from 'bcrypt';
import LoginOutputDto from '../models/dto/loginOutput.dto';
import ApiError from '../utils/exeptions/apiError';
import UserLoginOutputDto from '../models/dto/userLoginOutput.dto';
import userPgRepository from '../repositories/PostgreSQL/userPgRepository';
import UserRegisterDto from '../models/dto/userRegisterOutput.dto';
import IUserRepository from '../repositories/IUserRepository';
import tokenPgRepository from '../repositories/PostgreSQL/tokenPgRepository';
import ITokenRepository from '../repositories/ITokenRepository';

class AccountService {
  private readonly userRepository: IUserRepository = userPgRepository;
  private readonly tokenRepository: ITokenRepository = tokenPgRepository;


  async register(user: UserCreateDto): Promise<UserRegisterDto> {
    const hashedPassword = await bcrypt.hash(user.password, 3);

    const createdUser = await this.userRepository.createUser({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      surname: user.surname,
    });

    const tokenPayload: TokenPayloadDto = {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(createdUser.id, tokens.refreshToken);

    const verificationLink = `${process.env.API_URL}/auth/verify/?id=${createdUser.id}`;

    await emailService.sendActivateEmail(createdUser.email, verificationLink);

    return { tokens, user };
  }

  async login(userData: UserLoginDto): Promise<UserLoginOutputDto> {
    const candidate = await this.userRepository.getByEmail(userData.email);

    if (!candidate.isVerified) {
      throw ApiError.BadRequest('User is not verify');
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      candidate.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Incorrected password');
    }

    return candidate;
  }

  async refresh(refreshToken: string): Promise<LoginOutputDto> {
    if (!refreshToken) {
      throw ApiError.BadRequest('Refresh-token is not found');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDatabase = await this.tokenRepository.getByRefreshToken(
      refreshToken
    );

    if (!tokenFromDatabase) {
      throw ApiError.BadRequest('Refresh-token is alredy delete');
    }

    const user = await this.userRepository.getById(userData.id);

    const tokenPayload: TokenPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async verify(linkId: string) {
    const userData = await this.userRepository.getById(linkId);
    userData.isVerified = true;
    this.userRepository.updateUser(linkId, userData);
  }

  async logout(refreshToken: string) {
    await tokenService.deleteToken(refreshToken);
  }
}

export default new AccountService();
