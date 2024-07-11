import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'timestamp', nullable: false })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: false })
    endDate: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'userId' })
    user: User;
}
