import notify from '@/helpers/notify';
import userService from '@/services/userService';

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(async () => {
                try {
                    const result = await func(...args);
                    resolve(result);
                } catch (error) {
                    console.error('Error in debounced function:', error);
                    resolve([]);
                }
            }, delay);
        });
    };
};

export const debouncedSearchUserOptions = debounce(async (query) => {
    if (query.length >= 3) {
        try {
            const res = await userService.searchUser(query);
            const users = res.data;

            return users.map((user) => ({
                userId: user.id,
                value: user.username,
            }));
        } catch (err) {
            notify(err.response);
        }
    }
}, 500);
