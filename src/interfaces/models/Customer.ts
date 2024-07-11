import { IOrder } from './Order';

export interface ICustomer {
    customer_id?: string;
    name: string;
    email: string;
    phone_number: string;
    orders?: IOrder[];
}
