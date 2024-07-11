import httpClient from '@/services/http';

const toQueryParams = ({
    page,
    pageSize,
    orderNumber,
    from,
    to,
    user,
    minTotalAmount,
    maxTotalAmount,
}) => {
    let queryParams = `page=${page}&pageSize=${pageSize}`;
    queryParams += orderNumber ? `&orderNumber=${orderNumber}` : '';
    queryParams += from ? `&from=${from}` : '';
    queryParams += to ? `&to=${to}` : '';
    queryParams += user ? `&user=${user}` : '';
    queryParams += minTotalAmount ? `&minTotalAmount=${minTotalAmount}` : '';
    queryParams += maxTotalAmount ? `&maxTotalAmount=${maxTotalAmount}` : '';

    return queryParams;
};

class OrderService {
    getFilteredOrders = async (query) => {
        const queryParams = toQueryParams(query);
        return await httpClient.get(`/orders/filter?${queryParams}`);
    };

    createOrder = async (payload) => {
        return await httpClient.post('/orders', payload);
    };
}

export default new OrderService();
