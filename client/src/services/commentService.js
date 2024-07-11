import httpClient from '@/services/http';

class CommentService {
    getPostComments = async (postId, page) => {
        return await httpClient.get(`/comments/post/${postId}?page=${page}`);
    };

    createComment = async (payload) => {
        return await httpClient.post(`/comments`, payload);
    };
}

export default new CommentService();
