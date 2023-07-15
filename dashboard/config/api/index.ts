import axios, { AxiosRequestConfig } from 'axios';

interface CallAPIProps extends AxiosRequestConfig {
    token?: boolean;
    serverToken?: string;
}

export default async function callAPI({
    url, method, data,
}: CallAPIProps) {
    let headers = {};
    const response = await axios({
        url,
        method,
        data,
        headers,
    }).catch((err) => err.response);

    if (response.status > 300) {
        const res = {
            error: true,
            message: response.data.message,
            data: null,
        };
        return res;
    }

    const { length } = Object.keys(response.data);
    const res = {
        error: false,
        message: 'success',
        data: length > 1 ? response.data : response.data.data,
    };

    return res;
}
