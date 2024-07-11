import { IOrder } from './Order';

export interface ITransaction {
    transaction_id?: string;
    transaction_date: Date;
    amount: number;
    order?: IOrder;
}
