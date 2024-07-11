import httpClient from '@/services/http';

class AuthService {
    login = async (payload) => {
        return await httpClient.post('/auth/login', payload);
    };

    register = async (payload) => {
        return await httpClient.post('/auth/register', payload);
    };

    checkIsAuthenticated = async (payload) => {
        return await httpClient.post('/auth/check', payload);
    };

    logout = async () => {
        return await httpClient.get('/auth/logout');
    };
}

export default new AuthService();
