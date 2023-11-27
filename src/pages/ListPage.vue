<template>
    <div class="container">
        <div class="filter-list-wrapper">
            <div class="filter-area">
                <YearFilterBox title="Yıl"/>
                <CategoryFilterBox title="Kategori" />
            </div>
            <div class="list-area">
                <ProductItems />
            </div>
        </div>


    </div>
</template>

<script src="../js/ListPage.js"></script>
<style lang="scss" scoped>
@import "@/css/ListPage.scss";

</style>
