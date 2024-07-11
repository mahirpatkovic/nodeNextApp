import { Like, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { IUser } from '../interfaces/models/User';
import { IPagination } from '../interfaces/models/Pagination';

export class UserRepository {
    private readonly repository: Repository<User> =
        AppDataSource.getRepository(User);

    public async create(payload: IUser): Promise<User> {
        const user: User = this.repository.create(payload);
        return await this.repository.save(user);
    }

    public async getAll(
        page: number,
        pageSize: number,
    ): Promise<IPagination<User>> {
        const [users, total] = await this.repository.findAndCount({
            relations: ['posts'],
            take: pageSize,
            skip: (page - 1) * pageSize,
        });

        const totalPages: number = Math.ceil(total / pageSize);

        return {
            data: users,
            total,
            page,
            pageSize,
            totalPages,
        };
    }

    public async findUsersBySearch(query: string): Promise<User[]> {
        return await this.repository.find({
            where: { username: Like(`%${query}%`) },
        });
    }

    public async getUser(id: string): Promise<User> {
        return await this.repository.findOneBy({ id });
    }

    public async findExistingUser(
        username?: string,
        email?: string,
    ): Promise<User> {
        return await this.repository.findOne({
            where: [{ username }, { email }],
            select: [
                'id',
                'username',
                'email',
                'password',
                'createdAt',
                'updatedAt',
            ],
        });
    }
}
