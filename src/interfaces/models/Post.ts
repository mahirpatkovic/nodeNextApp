import { IUser } from './User';
import { IComment } from './Comment';

export interface IPost {
    id: string;
    title: string;
    content: string;
    user?: IUser;
    comments?: IComment[];
}
