import { NextFunction, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import LikeService from '../../core/services/like.service';
import LikeInputDto from '../../utils/dtos/likes/like-input.dto';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject, injectable } from 'inversify';
import { LikeTypes } from '../../core/types/like.types';

@injectable()
class LikeController {
  constructor(
    @inject(LikeTypes.LikeService) private likeService: LikeService,
  ){}

  public async likePost(
    req: RequestWithBody<LikeInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { user, postId } = req.body;
      const like = await this.likeService.likePost(user, postId);
      res.json(like).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  public async getPostLikesCount(
    req: RequestWithQuery<{ postId: number }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.query;
      const likesCount = await this.likeService.getPostLikesCount(Number(postId));
      res.json(likesCount).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default LikeController;
