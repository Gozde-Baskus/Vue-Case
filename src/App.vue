<!-- App.vue -->
<template>
    <div id="app">
        <AppHeader />
        <router-view></router-view>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

}
body{margin: 0; background: #f6f6f6}
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
