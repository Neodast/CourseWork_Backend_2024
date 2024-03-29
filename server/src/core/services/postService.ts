import pgPostRepository from '../../db/dbRepositories/postgreSQL/pgPostRepository';
import PostModel from '../models/postModel';
import IPostRepository from '../repositories/IPostRepository';

class PostService {
  constructor(readonly postRepository: IPostRepository) {}

  public async createPost(postData: PostModel): Promise<PostModel> {
    return this.postRepository.createPost(postData);
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.postRepository.getById(post.id);
    return this.postRepository.deletePost(dbPost);
  }

  public async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }
}

export default new PostService(pgPostRepository);
