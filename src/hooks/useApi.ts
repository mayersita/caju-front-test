import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useApi = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = async (config: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios(config);
            setData(response.data);
        } catch (err) {
            setError('Erro ao realizar a requisição');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, sendRequest };
};

export default useApi;
