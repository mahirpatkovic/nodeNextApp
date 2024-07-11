import httpClient from '@/services/http';

class TaskService {
    getUserTasks = async (user, startDate, endDate) => {
        return await httpClient.get(`/tasks/user/${user}?startDate=${startDate}&endDate=${endDate}`);
    };

    createTask = async (payload) => {
        return await httpClient.post(`/tasks`, payload);
    };

    updateTask = async (id, payload) => {
        return await httpClient.patch(`/tasks/${id}`, payload);
    };

    deleteTask = async (id) => {
        return await httpClient.delete(`/tasks/${id}`);
    };
}

export default new TaskService();
