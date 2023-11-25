<template>
    <div class="container">
        <div class="filter-list-wrapper">
            <div class="filter-area">
                <FilterBox/>
                <FilterBox/>
                <FilterBox/>
            </div>
            <div class="list-area">
                <ProductItem />
            </div>
        </div>


    </div>
</template>

<script src="../js/ListPage.js"></script>
<style lang="scss" scoped>
@import "@/css/ListPage.scss";

</style>
