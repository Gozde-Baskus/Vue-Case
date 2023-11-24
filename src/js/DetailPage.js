import {fetchProductDetail} from '@/services/apiService';
import {VueperSlides, VueperSlide} from 'vueperslides'

import 'vueperslides/dist/vueperslides.css'

export default {
    name: 'DetailPage',
    components: {VueperSlides, VueperSlide},
    data() {
        return {
            product: {},
        };
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        async fetchProduct() {
            try {
                const response = await fetchProductDetail(this.$route.params.id);
                const product = response.data

                product.photos = product.photos.map(item => ({
                    url: item.replace('{0}', '580x435')
                }));

                this.product = product;
                console.log(this.product)
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },


    },
};
