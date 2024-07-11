import httpClient from '@/services/http';

const toQueryParams = ({
    orderNumber,
    from,
    to,
    user,
    minTotalAmount,
    maxTotalAmount,
    type,
}) => {
    let queryParams = `retrieveAll=true&type=${type}`;
    queryParams += orderNumber ? `&orderNumber=${orderNumber}` : '';
    queryParams += from ? `&from=${from}` : '';
    queryParams += to ? `&to=${to}` : '';
    queryParams += user ? `&user=${user}` : '';
    queryParams += minTotalAmount ? `&minTotalAmount=${minTotalAmount}` : '';
    queryParams += maxTotalAmount ? `&maxTotalAmount=${maxTotalAmount}` : '';

    return queryParams;
};

class ExportService {
    export = async (query) => {
        const queryParams = toQueryParams(query);
        return await httpClient.get(`/export/orders?${queryParams}`, {
            responseType: 'blob',
        });
    };
}

export default new ExportService();
