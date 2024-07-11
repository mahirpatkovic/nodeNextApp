import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
import { Comment } from './Comment';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    content: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}
