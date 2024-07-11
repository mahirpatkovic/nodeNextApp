import { CommentRepository } from '../repositories/CommentRepository';
import { Comment } from '../entities/Comment';
import { IComment } from '../interfaces/models/Comment';
import { IUser } from '../interfaces/models/User';
import { IPagination } from '../interfaces/models/Pagination';

export class CommentService {
    private readonly repository: CommentRepository = new CommentRepository();

    public async createComment(
        data: IComment,
        currentUser: IUser,
    ): Promise<Comment> {
        return this.repository.createComment(data, currentUser);
    }

    public async getAllPostComments(
        postId: string,
        page: number,
        pageSize: number,
    ): Promise<IPagination<Comment>> {
        return await this.repository.getAllPostComments(postId, page, pageSize);
    }
}
