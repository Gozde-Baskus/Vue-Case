<template>
    <div class="product-item-wrapper">
        <table>
            <tr>
                <th>Fotoğraf</th>
                <th>Model Adı</th>
                <th>Başlık</th>
                <th>Yıl</th>
                <th>KM</th>
                <th>Renk</th>
                <th>Fiyat</th>
                <th>Tarih</th>
                <th>Lokasyon</th>
            </tr>
            <tr v-for="item in displayedItems" :key="item.id" @click="getDetail(item.id)">
                <td><div class="item-img"><img :src="item.photo"/></div></td>
                <td>{{ item.modelName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ getValue('year',item.properties) }}</td>
                <td>{{ getValue('km',item.properties) }} </td>
                <td>{{ getValue('color',item.properties) }}</td>
                <td class="item-price">{{ item.price }} TL</td>
                <td>{{ item.dateFormatted }} </td>
                <td>{{ item.location.cityName }} {{ item.location.townName }} </td>
            </tr>
        </table>
        <div class="pagination">
            <button class="pagination-button" :class="{ disabled: currentPage === 1 }" @click="prevPage">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button
                v-for="page in pageCount"
                :key="page"
                class="pagination-button"
                :class="{ active: currentPage === page }"
                @click="goToPage(page)"
            >
                {{ page }}
            </button>

            <button class="pagination-button" :class="{ disabled: currentPage === pageCount }" @click="nextPage">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="select-perPage">
           <span>Her sayfada</span>
            <span
                class="pagination-button"
                :class="{ active: itemsPerPage === 20 }"
                @click="changePerPage(20)"
            >
        20
      </span>
            <span
                class="pagination-button"
                :class="{ active: itemsPerPage === 50 }"
                @click="changePerPage(50)"
            >
        50
      </span>
            <span>sonuç göster</span>
        </div>    </div>
</template>

<script>
import {fetchProducts} from "@/services/apiService";

export default {
    name: 'ProductItem',

    data() {
        return {
            products:[],
            itemsPerPage: 20,
            currentPage: 1,
        };
    },
    computed: {
        pageCount() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        },
        displayedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        },
    },
    mounted() {
        this.fetchProductList();
    },
    methods: {
        async fetchProductList() {
            try {
                const response = await fetchProducts(1, 0, 50, this.currentPage);
                this.products = response.data.map(product => {
                    product.photo = product.photo.replace('{0}', '240x180');
                    return {
                        ...product,

                    };
                });
                console.log(this.products)

            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        },
        getDetail(id) {
            this.$router.push({ name: 'detail', params: { id } });
        },
        getValue(type, properties) {
            const yearObject = properties.find(property => property.name === type);
            return yearObject ? yearObject.value : '';
        },
        goToPage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++;
            }
        },
        changePerPage(value) {
            this.itemsPerPage = value;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/ListPage.scss";
</style>
