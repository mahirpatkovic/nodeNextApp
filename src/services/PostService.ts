import { Post } from '../entities/Post';
import { IPost } from '../interfaces/models/Post';
import { IUser } from '../interfaces/models/User';
import { PostRepository } from '../repositories/PostRepository';
import { IPagination } from '../interfaces/models/Pagination';

export class PostService {
    private readonly repository: PostRepository = new PostRepository();

    public async createPost(data: IPost, currentUser: IUser): Promise<Post> {
        return await this.repository.createPost(data, currentUser);
    }

    public async getAllPosts(
        page: number,
        pageSize: number,
    ): Promise<IPagination<Post>> {
        return await this.repository.getAllPosts(page, pageSize);
    }
}
