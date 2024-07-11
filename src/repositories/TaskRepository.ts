import { Between, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Task } from '../entities/Task';
import { ITask } from '../interfaces/models/Task';
import * as moment from 'moment';

export class TaskRepository {
    private readonly repository: Repository<Task> =
        AppDataSource.getRepository(Task);

    public async create(data: ITask): Promise<Task> {
        const task: Task = this.repository.create(data);
        return await this.repository.save(task);
    }

    public async update(id: string, data: Partial<ITask>): Promise<Task> {
        await this.repository.update(id, data);
        return await this.repository.findOneByOrFail({ id });
    }

    public async getAllUserTasks(
        userId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Task[]> {
        const formattedStartDate = moment(startDate).startOf('day').toDate();
        const formattedEndDate = moment(endDate).endOf('day').toDate();

        return await this.repository.find({
            where: {
                user: { id: userId },
                startDate: Between(formattedStartDate, formattedEndDate),
            },
            relations: ['user'],
        });
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
