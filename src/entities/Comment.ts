import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { Post } from './Post';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, type: 'varchar', nullable: false })
    content: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
    post: Post;
}
