// src/components/ListPage.js

import FilterBox from '@/components/FilterBox.vue';
import ProductItem from '@/components/ProductItem.vue';
import { fetchProducts } from '@/services/apiService';

export default {
    name: 'ListPage',
    components: {
        FilterBox,
        ProductItem,
    },
    data() {
        return {
            productList: [],
        };
    },
    mounted() {
        this.fetchProductList();
    },
    methods: {
        async fetchProductList() {
            try {
                const response = await fetchProducts(1, 0, 10);
                this.productList = response.data;

            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        },
    },
};
