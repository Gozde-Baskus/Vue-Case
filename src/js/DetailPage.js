import { fetchProductDetail } from '@/services/apiService';

export default {
    name: 'DetailPage',
    components: {},
    data() {
        return {
            product: {},
            id: this.$route.params.id,
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        this.fetchProduct();
    },
    methods: {
        async fetchProduct() {
            try {
                const response = await fetchProductDetail(this.id);
                this.product = response.data;
                console.log('bu', response);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },
        getValue(type,properties) {
            const yearObject = properties.find(property => property.name === type);
            return yearObject ? yearObject.value : '';

        }
    },
};
