import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Transaction } from './Transaction';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    order_date: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    order_number: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    total_amount: number;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.order)
    transaction: Transaction;
}
