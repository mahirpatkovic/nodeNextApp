import { OrderRepository } from '../repositories/OrderRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { IOrder } from '../interfaces/models/Order';
import { ITransaction } from '../interfaces/models/Transaction';
import { Order } from '../entities/Order';
import { OrderFilter } from '../interfaces/filters/OrderFilter';
import { IUser } from '../interfaces/models/User';
import { IPagination } from '../interfaces/models/Pagination';

export class OrderService {
    private readonly repository: OrderRepository = new OrderRepository();
    private readonly transactionRepository: TransactionRepository =
        new TransactionRepository();

    public async createOrder(orderData: IOrder, user: IUser): Promise<Order> {
        const orderNumber: string = await this.createOrderNumber();

        const newOrder: Order = await this.repository.createOrder({
            ...orderData,
            user,
            order_number: orderNumber,
        });

        const transactionData: ITransaction = {
            transaction_date: new Date(),
            amount: newOrder.total_amount,
            order: newOrder,
        };

        newOrder.transaction =
            await this.transactionRepository.createTransaction(transactionData);

        return newOrder;
    }

    public async getOrder(id: string): Promise<Order> {
        return await this.repository.getOrderById(id);
    }

    public async getOrderWithFilter(
        filter: OrderFilter,
    ): Promise<IPagination<Order> | Order[]> {
        return await this.repository.getOrdersWithFilter(filter);
    }

    private async createOrderNumber(): Promise<string> {
        const lastOrder: Order = await this.repository.getLastOrder();

        if (!lastOrder) {
            return '001';
        }

        const lastOrderNumber: number = parseInt(lastOrder.order_number, 10);
        return (lastOrderNumber + 1).toString().padStart(3, '0');
    }
}
