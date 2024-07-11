import { ITask } from '../interfaces/models/Task';
import { TaskRepository } from '../repositories/TaskRepository';
import { Task } from '../entities/Task';

export class TaskService {
    private readonly repository: TaskRepository = new TaskRepository();

    public async create(payload: ITask): Promise<Task> {
        return await this.repository.create(payload);
    }

    public async update(taskId: string, data: Partial<ITask>): Promise<Task> {
        return await this.repository.update(taskId, data);
    }

    public async getAllUserTasks(
        userId: string,
        startDate: Date,
        endDate: Date,
    ): Promise<Task[]> {
        return await this.repository.getAllUserTasks(
            userId,
            startDate,
            endDate,
        );
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
