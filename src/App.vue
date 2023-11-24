<!-- App.vue -->
<template>
    <div id="app">
        <AppHeader />
        <router-view></router-view>
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
        AppFooter
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

}
body{margin: 0; background-color: #f8f8f8!important;}
.container{
    max-width: 1300px;
    margin: auto auto;
}
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    background-color: #bdbdbd;
    border-radius: 6px;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
