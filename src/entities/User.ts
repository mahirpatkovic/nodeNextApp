import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Post } from './Post';
import { Comment } from './Comment';
import { Order } from './Order';
import { Task } from './Task';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, nullable: false })
    @Unique(['username'])
    username: string;

    @Column({ length: 100, nullable: false })
    @Unique(['email'])
    email: string;

    @Column({ length: 100, nullable: false, select: false })
    password: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}
