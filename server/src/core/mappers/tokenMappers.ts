import RefreshStringDto from '../../utils/dtos/tokenDtos/refreshString.dto';
import TokenModel from '../models/tokenModel';

class TokenMapper {
  public static mapToRefreshStringDto(token: TokenModel): RefreshStringDto {
    return {
      refreshToken: token.refreshToken,
    };
  }
}

export default TokenMapper;