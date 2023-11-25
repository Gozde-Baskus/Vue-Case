// src/services/apiService.js

import axios from 'axios';

const apiService = axios.create({
    baseURL: 'https://sandbox.arabamd.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProducts = (sort, sortDirection, take, skip) => {
    return apiService.get('/listing', {
        params: {
            sort,
            sortDirection,
            take,
            skip,
        },
    });
};
export const fetchProductDetail = (id) => {
    return apiService.get('/detail', {
        params: {
            id,
        },
    });
};
