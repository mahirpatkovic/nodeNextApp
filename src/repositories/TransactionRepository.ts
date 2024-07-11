import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { ITransaction } from '../interfaces/models/Transaction';
import { Transaction } from '../entities/Transaction';

export class TransactionRepository {
    private readonly repository: Repository<Transaction> =
        AppDataSource.getRepository(Transaction);

    public async createTransaction(data: ITransaction): Promise<Transaction> {
        const transaction: Transaction = this.repository.create(data);
        return await this.repository.save(transaction);
    }

    public async getTransactionById(
        transactionId: string,
    ): Promise<Transaction> {
        return await this.repository.findOne({
            where: { transaction_id: transactionId },
            relations: ['order'],
        });
    }
}
