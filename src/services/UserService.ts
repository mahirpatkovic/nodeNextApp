import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { IPagination } from '../interfaces/models/Pagination';

export class UserService {
    private readonly repository: UserRepository = new UserRepository();

    public async getUsers(
        page: number,
        pageSize: number,
    ): Promise<IPagination<User>> {
        return await this.repository.getAll(page, pageSize);
    }

    public async getUser(id: string): Promise<User> {
        return await this.repository.getUser(id);
    }

    public async searchUsers(searchQuery: string): Promise<User[]> {
        return await this.repository.findUsersBySearch(searchQuery);
    }
}
