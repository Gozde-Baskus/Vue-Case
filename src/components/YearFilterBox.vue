<!-- components/AppHeader.vue -->
<template>
    <div class="filter-box">
        <div class="title">{{ title }}</div>
        <div class="content">
            <div class="input-wrapper" >
                <input placeholder="Min" v-model="this.minDate" @keypress.enter="saveDate"/>
                <input placeholder="Max" v-model="this.maxDate" @keypress.enter="saveDate"/>
                <button class="applyButton" @click="saveDate()">Ara</button>
            </div>



        </div>
    </div>
</template>

<script>
export default {
    name: 'YearFilterBox',
    props: {
        title: String,
    },
    data() {
        return {
            minDate:this.$route.query.minDate,
            maxDate:this.$route.query.maxDate
        };
    },
    methods:{
        saveDate() {




            this.$router.push({
                path:"/",
                query: {
                    ...this.$route.query,
                    minDate: this.minDate || undefined,
                    maxDate: this.maxDate || undefined,
                }
            })

            return;
            /*
            let selectedFilter = localStorage.getItem('selectedFilter');
            if (selectedFilter) {
                selectedFilter = JSON.parse(selectedFilter);
            } else {
                selectedFilter = {};
            }
            selectedFilter.minDate = this.minDate;
            selectedFilter.maxDate = this.maxDate;
            localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));

             */
        }

    }
};
</script>

<style lang="scss" scoped>
@import "@/css/ListPage.scss";

</style>
