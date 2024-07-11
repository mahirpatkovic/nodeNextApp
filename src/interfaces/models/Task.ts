import { IUser } from './User';

export interface ITask {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    user: IUser;
}
