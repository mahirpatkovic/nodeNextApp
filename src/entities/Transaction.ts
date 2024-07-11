import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Order } from './Order';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    transaction_id: string;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    transaction_date: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount: number;

    @ManyToOne(() => Order, (order) => order.transaction)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
