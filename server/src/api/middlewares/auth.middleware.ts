import tokenService from '../../core/services/tokenService';
import ApiError from '../../utils/exeptions/apiError';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError('header'));
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError('access'));
    }
    const userData = await tokenService.validateAccessToken(accessToken);

    req.user = userData;

    next();
  } catch (e) {
    return next(e);
  }
};
