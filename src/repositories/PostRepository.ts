import { Repository } from 'typeorm';
import { Post } from '../entities/Post';
import { AppDataSource } from '../config/data-source';
import { IPost } from '../interfaces/models/Post';
import { IPagination } from '../interfaces/models/Pagination';
import { IUser } from '../interfaces/models/User';

export class PostRepository {
    private readonly repository: Repository<Post> =
        AppDataSource.getRepository(Post);

    public async createPost(data: IPost, user: IUser): Promise<Post> {
        const post: Post = this.repository.create({ ...data, user });
        return await this.repository.save(post);
    }

    public async getAllPosts(
        page: number,
        pageSize: number,
    ): Promise<IPagination<Post>> {
        const [posts, total] = await this.repository.findAndCount({
            relations: ['user'],
            take: pageSize,
            skip: (page - 1) * pageSize,
        });

        const totalPages: number = Math.ceil(total / pageSize);

        return {
            data: posts,
            total,
            page,
            pageSize,
            totalPages,
        };
    }
}
