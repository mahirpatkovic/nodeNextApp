import { Repository, SelectQueryBuilder } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Order } from '../entities/Order';
import { IOrder } from '../interfaces/models/Order';
import { OrderFilter } from '../interfaces/filters/OrderFilter';
import * as moment from 'moment';
import { IPagination } from '../interfaces/models/Pagination';

export class OrderRepository {
    private readonly repository: Repository<Order> =
        AppDataSource.getRepository(Order);

    public async createOrder(data: IOrder): Promise<Order> {
        const order: Order = this.repository.create(data);
        return await this.repository.save(order);
    }

    public async getOrderById(orderId: string): Promise<Order> {
        return await this.repository.findOne({
            where: { order_id: orderId },
            relations: ['user', 'transaction'],
        });
    }

    public async getLastOrder(): Promise<Order> {
        return await this.repository
            .createQueryBuilder('order')
            .orderBy('order.createdAt', 'DESC')
            .getOne();
    }

    public async getOrdersWithFilter(
        filter: OrderFilter,
    ): Promise<Order[] | IPagination<Order>> {
        const query: SelectQueryBuilder<Order> =
            this.getFilteredOrderQuery(filter);

        if (filter.retrieveAll) {
            return await query.getMany();
        }

        const page: number = parseInt(filter.page);
        const pageSize: number = parseInt(filter.pageSize);

        query.skip((page - 1) * pageSize).take(pageSize);

        const [orders, total] = await query.getManyAndCount();

        const totalPages: number = Math.ceil(total / pageSize);

        return {
            data: orders,
            total,
            page,
            pageSize,
            totalPages,
        };
    }

    private getFilteredOrderQuery(
        filter: OrderFilter,
    ): SelectQueryBuilder<Order> {
        let query: SelectQueryBuilder<Order> = this.repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user');

        if (filter.orderNumber) {
            query = query.andWhere('order.order_number = :orderNumber', {
                orderNumber: filter.orderNumber,
            });
        }

        if (filter.customer) {
            query = query.andWhere('order.user_id = :userId', {
                customerId: filter.customer,
            });
        }

        if (filter.from && filter.to) {
            const fromDate: Date = moment(filter.from).startOf('day').toDate();
            const toDate: Date = moment(filter.to).endOf('day').toDate();
            query = query.andWhere('order.createdAt BETWEEN :from AND :to', {
                from: fromDate,
                to: toDate,
            });
        } else if (filter.from) {
            const fromDate: Date = moment(filter.from).startOf('day').toDate();
            query = query.andWhere('order.createdAt >= :from', {
                from: fromDate,
            });
        } else if (filter.to) {
            const toDate: Date = moment(filter.to).endOf('day').toDate();
            query = query.andWhere('order.createdAt <= :to', { to: toDate });
        }

        if (filter.minTotalAmount && filter.maxTotalAmount) {
            query = query.andWhere(
                'order.total_amount BETWEEN :minTotalAmount AND :maxTotalAmount',
                {
                    minTotalAmount: parseFloat(filter.minTotalAmount),
                    maxTotalAmount: parseFloat(filter.maxTotalAmount),
                },
            );
        } else if (filter.minTotalAmount) {
            query = query.andWhere('order.total_amount >= :minTotalAmount', {
                minTotalAmount: parseFloat(filter.minTotalAmount),
            });
        } else if (filter.maxTotalAmount) {
            query = query.andWhere('order.total_amount <= :maxTotalAmount', {
                maxTotalAmount: parseFloat(filter.maxTotalAmount),
            });
        }

        return query;
    }
}
