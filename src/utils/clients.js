import axios from 'axios'
import { serilaizeQuery } from './others';

const BASE_URL = ''

export function fetchClients(query = {}) {
    // console.log('query:', query);
    if (query || query !== {}) query = '?'+ serilaizeQuery(query)

    const url = `${BASE_URL}/clients` + query;
    return axios({
        method: 'GET',
        url: url,
    })
}

export function createNewClient(payload) {
    const url = '/clients';

    return axios({
        method: 'post',
        url: url,
        data: payload,
    })
}

export function editClient(id, payload) {
    const url = `/clients/${id}`;

    return axios({
        method: 'put',
        url: url,
        data: payload,
    })
}

export function deleteClient(id) {
    const url = `/clients/${id}`;

    return axios({
        method: 'delete',
        url: url,
    })
}