/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as config from '../config/ApiConfig';

const RESOURCE = '/clientes';

//cadastro..
export const post = (cliente, token) => {
    return axios.post(config.ENDPOINT + RESOURCE, cliente, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(
        response => {
            return response.data;
        }
    );
};

//edição
export const put = (cliente, token) => {
    return axios.put(config.ENDPOINT + RESOURCE, cliente, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(
        response => {
            return response.data;
        }
    );
};

//exclusão
export const remove = (id, token) => {
    return axios.delete(config.ENDPOINT + RESOURCE + '/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(
        response => {
            return response.data;
        }
    );
};

//consultar todos
export const getAll = (token) => {
    return axios.get(config.ENDPOINT + RESOURCE, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(
        response => {
            return response.data;
        }
    );
};

//consultar por id
export const getById = (id, token) => {
    return axios.get(config.ENDPOINT + RESOURCE + '/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(
        response => {
            return response.data;
        }
    );
};

//consultar historico de clientes
export const getHistorico = (token) => {
    return axios.get(config.ENDPOINT + RESOURCE + '/historico', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }).then(
        response => {
            return response.data;
        }
    );
};


