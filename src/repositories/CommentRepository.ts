import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Comment } from '../entities/Comment';
import { IComment } from '../interfaces/models/Comment';
import { IUser } from '../interfaces/models/User';
import { IPagination } from '../interfaces/models/Pagination';

export class CommentRepository {
    private readonly repository: Repository<Comment> =
        AppDataSource.getRepository(Comment);

    public async createComment(data: IComment, user: IUser): Promise<Comment> {
        const comment: Comment = this.repository.create({ ...data, user });
        return await this.repository.save(comment);
    }

    public async getAllPostComments(
        postId: string,
        page: number,
        pageSize: number,
    ): Promise<IPagination<Comment>> {
        const [comments, total] = await this.repository.findAndCount({
            where: { post: { id: postId } },
            relations: ['user'],
            order: { createdAt: 'DESC' },
            take: pageSize,
            skip: (page - 1) * pageSize,
        });

        const totalPages: number = Math.ceil(total / pageSize);

        return {
            data: comments,
            total,
            page,
            pageSize,
            totalPages,
        };
    }
}
