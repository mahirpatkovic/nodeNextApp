import httpClient from '@/services/http';

class PostService {
    getPosts = async (page, pageSize) => {
        return await httpClient.get(`/posts?page=${page}&pageSize=${pageSize}`);
    };

    createPost = async (payload) => {
        return await httpClient.post(`/posts`, payload);
    };
}

export default new PostService();
