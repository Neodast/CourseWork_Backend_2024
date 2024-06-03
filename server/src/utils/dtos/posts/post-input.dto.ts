import UserSafeDto from '../users/user-safe.dto';

interface PostInputDto {
  title: string;
  text: string;
  author: UserSafeDto;
  sectionTitle: string;
}

export default PostInputDto;