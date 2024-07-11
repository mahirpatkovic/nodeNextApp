import { ITransaction } from './Transaction';
import { IUser } from './User';

export interface IOrder {
    order_id?: string;
    order_number: string;
    order_date: Date;
    total_amount: number;
    user?: IUser;
    transaction?: ITransaction;
}
