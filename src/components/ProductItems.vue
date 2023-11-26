<template>
    <div class="product-item-wrapper">
        <div class="sorting-wrapper">
            <div class="selected-category-title">Satılık 2. El Araba Fiyatları ve Modelleri </div>
            <select v-model="sortOrder" @change="fetchProductList" id="sortOrder">
                <option value="0">Fiyata Göre Artan</option>
                <option value="1">Fiyata Göre Azalan</option>
                <option value="2">Tarihe Göre Artan</option>
                <option value="3">Tarihe Göre Azalan</option>
                <option value="4">Yıla Göre Artan</option>
                <option value="5">Yıla Göre Azalan</option>
            </select>
        </div>
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
            <tr v-for="item in products" :key="item.id" @click="getDetail(item.id)">
                <td>
                    <div class="item-img"><img :src="item.photo"/></div>
                </td>
                <td>{{ item.modelName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ getPropertiesValue('year', item.properties) }}</td>
                <td>{{ getPropertiesValue('km', item.properties) }}</td>
                <td>{{ getPropertiesValue('color', item.properties) }}</td>
                <td class="item-price">{{ item.price }} TL</td>
                <td>{{ item.dateFormatted }}</td>
                <td>{{ item.location.cityName }} {{ item.location.townName }}</td>
            </tr>
        </table>
        <div class="pagination">
            <button
                    class="pagination-button"
                    :class="{ disabled: currentPage === 1 }"
                    @click="prevPage"
            >
                <i class="fas fa-chevron-left"></i>
            </button>

            <button
                    v-for="button in paginationButtons"
                    :key="button.page"
                    class="pagination-button"
                    :class="{ active: currentPage === button.page, ellipsis: button.ellipsis }"
                    @click="goToPage(button.page)"
            >
                {{ button.ellipsis ? '...' : button.page }}
            </button>

            <button
                    class="pagination-button"
                    :class="{ disabled: currentPage === pageCount }"
                    @click="nextPage"
            >
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="select-perPage">
            <span>Her sayfada</span>
            <span class="pagination-button" :class="{ active: itemsPerPage === 20 }"
                  @click="changePerPage(20)">20</span>
            <span class="pagination-button" :class="{ active: itemsPerPage === 50 }"
                  @click="changePerPage(50)">50</span>
            <span>sonuç göster</span>
        </div>
    </div>
</template>

<script>
import {fetchProducts} from "@/services/apiService";

export default {
    name: 'ProductItems',

    data() {
        return {
            products: [],
            pageCount: 10,
            itemsPerPage: 20,
            currentPage: 1,
            sortOrder: 0,
            sortType: 0,
            selectedFilter: JSON.parse(localStorage.getItem('selectedFilter'))
        };
    },
    mounted() {
        this.fetchProductList();
    },
    watch: {
        itemsPerPage() {
            this.fetchProductList();
        },
        currentPage() {
            this.fetchProductList();
        }

    },
    computed: {
        paginationButtons() {
            const buttons = [];
            const showEllipsis = this.pageCount > 10;

            if (!showEllipsis) {
                for (let i = 1; i <= this.pageCount; i++) {
                    buttons.push({page: i, ellipsis: false});
                }
            } else {
                buttons.push({page: 1, ellipsis: false});

                const startEllipsis = this.currentPage > 10;
                const endEllipsis = this.currentPage < this.pageCount - 2;

                if (startEllipsis) {
                    buttons.push({page: '...', ellipsis: true});
                }

                const rangeStart = Math.max(2, this.currentPage - 1);
                const rangeEnd = Math.min(this.pageCount - 1, this.currentPage + 1);

                for (let i = rangeStart; i <= rangeEnd; i++) {
                    buttons.push({page: i, ellipsis: false});
                }

                if (endEllipsis) {
                    buttons.push({page: '...', ellipsis: true});
                }

                buttons.push({page: this.pageCount, ellipsis: false});
            }

            return buttons;
        },
    },
    methods: {
        saveLocal(){
            const sortOrderMap = {
                "0": {sortType: 0, sortOrder: 0},
                "1": {sortType: 0, sortOrder: 1},
                "2": {sortType: 1, sortOrder: 0},
                "3": {sortType: 1, sortOrder: 1},
                "4": {sortType: 2, sortOrder: 0},
                "5": {sortType: 2, sortOrder: 1},
            };

            const {sortType, sortOrder} = sortOrderMap[this.sortOrder] || {sortType: 0, sortOrder: 0};

            this.sortType = sortType;
            this.sortOrder = sortOrder;


            let selectedFilter = localStorage.getItem('selectedFilter');
            if (selectedFilter) {
                selectedFilter = JSON.parse(selectedFilter);
            } else {
                selectedFilter = {};
            }
            selectedFilter.sortType = this.sortType;
            selectedFilter.sortOrder = this.sortOrder;
            localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));



        },
        getDetail(id) {
            this.$router.push({name: 'detail', params: {id}});
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
        async fetchProductList() {
            this.saveLocal();

            try {
                const response = await fetchProducts(
                    this.sortType,
                    this.sortOrder,
                    this.itemsPerPage,
                    (this.currentPage - 1) * this.itemsPerPage,
                );

                const totalCount = 1000; // Responsedan gelmesini beklediğim toplam sayı
                this.pageCount = Math.ceil(totalCount / this.itemsPerPage);

                this.products = response.data.map(product => {
                    product.photo = product.photo.replace('{0}', '240x180');
                    return {
                        ...product,
                    };
                });

            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        },

    },
};
</script>

<style lang="scss" scoped>
@import "@/css/ListPage.scss";
</style>
