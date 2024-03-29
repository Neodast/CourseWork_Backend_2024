import UserSafeDto from '../../utils/dtos/userDtos/userSafe.dto';
import ThreadModel from '../models/threadModel';

interface IThreadRepository {
  getById(id: number): Promise<ThreadModel>;
  getByAuthor(author: UserSafeDto): Promise<ThreadModel[]>;
  getAll(): Promise<ThreadModel[]>;
  createThread(threadData: ThreadModel): Promise<ThreadModel>;
  updateThread(id: number, newThreadData: ThreadModel): Promise<ThreadModel>;
  deleteThread(thread: ThreadModel): Promise<void>;
}

export default IThreadRepository;