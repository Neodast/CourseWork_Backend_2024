import { Container } from 'inversify';
import { UserTypes } from '../types/user.types';
import UserService from '../services/user.service';
import UserController from '../../api/controllers/user.controller';
import PgUserRepository from '../../db/dbRepositories/user.repository';
import UserRepository from '../repositories/user.repository.type';
import EmailService from '../services/email.service';
import { EmailTypes } from '../types/email.types';

const userContainer = new Container({ defaultScope: 'Singleton' });
userContainer.bind<UserService>(UserTypes.UserService).to(UserService);
userContainer
  .bind<UserRepository>(UserTypes.UserRepository)
  .to(PgUserRepository);
userContainer.bind<UserController>(UserTypes.UserController).to(UserController);
userContainer.bind<EmailService>(EmailTypes.EmailService).to(EmailService);
export { userContainer };
