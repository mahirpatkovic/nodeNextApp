import axios from 'axios';

const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME;
const apiContextPath = process.env.NEXT_PUBLIC_API_CONTEXT_PATH;

const httpClient = axios.create({
    baseURL: `${apiHostname}${apiContextPath}`,
    timeout: 10000,
});

httpClient.defaults.withCredentials = true;

export default httpClient;
