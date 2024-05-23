import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './PostEntity';
import { Comment } from './CommentEntity';
import { Thread } from './ThreadEntity';
import { User } from './UserEntity';

@Entity({ name: 'Likes' })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  comment: Comment;

  @ManyToOne(() => Thread, (thread) => thread.likes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  thread: Thread;
}
