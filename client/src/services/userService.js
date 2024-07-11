import httpClient from '@/services/http';

class UserService {
    searchUser = async (query) => {
        return await httpClient.get(`/users/search?searchQuery=${query}`);
    };
}

export default new UserService();
