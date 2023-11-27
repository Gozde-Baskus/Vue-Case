<template>
    <div class="product-item-wrapper">
        <div class="sorting-wrapper">
            <div class="selected-category-title">Satılık 2. El Araba Fiyatları ve Modelleri</div>
            <SortingSelect/>
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
import SortingSelect from "@/components/SortingSelect.vue";

export default {
    name: 'ProductItems',
    components: {SortingSelect},

    data() {
        return {
            products: [],
            pageCount: 10,
            itemsPerPage: 20,
            currentPage: 1,
        };
    },
    mounted() {
        this.fetchProductList();
    },
    watch: {

        categoryId(){
            this.currentPage = 1;
            this.fetchProductList();
        },

        sortingValues() {
            this.currentPage = 1;
            this.fetchProductList();

        },
        itemsPerPage() {
            this.fetchProductList();
        },
        currentPage() {
            this.fetchProductList();
        },
        yearFilters() {
            this.currentPage = 1;
            this.fetchProductList();
        }

    },
    computed: {

        yearFilters() {
            if (!this.$route.query.minDate && !this.$route.query.maxDate) {
                return {};
            }
            return {minDate: this.$route.query.minDate, maxDate: this.$route.query.maxDate}
        },

        categoryId(){
            return this.$route.query.categoryId;
        },

        sortingValues(){
            if (!this.$route.query.sortType) {
                return {};
            }
            return {
                sort: this.$route.query.sortType,
                sortDirection: this.$route.query.sortDirectory
            }
        },


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
            //this.saveLocal();

            try {
                const response = await fetchProducts({
                    sort: this.sortingValues.sort,
                    sortDirection: this.sortingValues.sortDirection,
                    categoryId: this.categoryId,
                    take: this.itemsPerPage,
                    skip: (this.currentPage - 1) * this.itemsPerPage,
                    minYear: this.yearFilters.minDate,
                    maxYear: this.yearFilters.maxDate,
                });

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
