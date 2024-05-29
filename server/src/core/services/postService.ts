import { inject, injectable } from 'inversify';
import PostCreateDto from '../../utils/dtos/posts/PostCreate.dto';
import PostInputDto from '../../utils/dtos/posts/PostInput.dto';
import PostModel from '../models/PostModel';
import PostRepository from '../repositories/PostRepository';
import sectionService from './SectionService';
import { TYPES } from '../types/posts.types';

@injectable()
class PostService {
  constructor(@inject(TYPES.PostRepository) readonly postRepository: PostRepository) {}

  public async createPost(postData: PostInputDto): Promise<PostModel> {
    const section = await sectionService.getSection(postData.sectionTitle);
    const postCreateData: PostCreateDto = {
      section: section,
      ...postData,
    };
    return this.postRepository.createPost(postCreateData);
  }

  public async updatePost(post: PostModel): Promise<PostModel> {
    return this.postRepository.updatePost(post.id, post);
  }

  public async deletePost(postId: number): Promise<void> {
    const dbPost = await this.postRepository.getById(postId);
    return this.postRepository.deletePost(dbPost);
  }

  public async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }

  public async getPostById(postId: number) : Promise<PostModel> {
    return this.postRepository.getById(postId);
  }
}

export default PostService;
