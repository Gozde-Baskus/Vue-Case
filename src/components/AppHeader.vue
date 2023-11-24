<!-- components/AppHeader.vue -->
<template>
    <div class="app-header">
        <div class="container">
            <div class="header-main">
                <div class="logo">
                    <div class="d-flex justify-content-between">
                        <router-link to="/">
                        <img src="https://arbimg1.mncdn.com/assets2/dist/img/tek-tur-large.gif" alt="Arabam.com Logo">
                        </router-link>
                        <div class="search-input">
                             <span class="search-icon">
                <i class="fas fa-search"></i>
              </span>
                            <input class="custom-search" type="text" v-model="searchQuery" placeholder="Kelime,galeri adı veya ilan no ile ara">
                        </div>

                    </div>
                </div>
                <div class="nav-item">
                    <div class="user-name">Gözde Başkuş</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            searchQuery: '',
        };
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/AppHeader.scss";

</style>
