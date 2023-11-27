<!-- components/AppHeader.vue -->
<template>
    <div class="filter-box">
        <div class="title">{{ title }}</div>
        <div class="content">
            <div class="list-group">
                <div class="list-category-item" @click.prevent="selectCategoryId(undefined)">Tüm Kategoriler</div>
                <a href="#" v-for="(item,index) in categories" :key="index"
                   class="list-group-item list-group-item-action -hand-pointer-o"
                   :class="{
                        'active': categoryId===item.id.toString()
                        }"
                   @click.prevent="selectCategoryId(item.id)"
                >

                    {{ item.name }}

                </a>


            </div>


        </div>
    </div>
</template>

<script>

import categories from "../data/categories.json"

export default {
    name: 'CategoryFilterBox',
    props: {
        title: String,
    },
    data() {
        return {
            categories,
        };
    },

    computed: {

        categoryId() {
            return this.$route.query.categoryId
        }
    },
    methods: {
        selectCategoryId(id) {
            this.$router.push({
                path: "/",
                query: {
                    ...this.$route.query,
                    categoryId: id || undefined
                }
            })
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/css/ListPage.scss";

</style>
