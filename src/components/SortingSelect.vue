<template>


    <select v-model="sortOrder">
        <option value="0,0">Fiyata Göre Artan</option>
        <option value="0,1">Fiyata Göre Azalan</option>
        <option value="1,0">Tarihe Göre Artan</option>
        <option value="1,1">Tarihe Göre Azalan</option>
        <option value="2,0">Yıla Göre Artan</option>
        <option value="2,1">Yıla Göre Azalan</option>
    </select>


</template>
<script>

export default {
    name: 'SortingSelect',

    data() {
        return {
            sortOrder: "0,0"
        }

    },

    watch: {
        sortOrder() {
            const values = this.sortOrder.split(",");
            this.$router.push({
                path:".",
                query:{
                    ...this.$route.query,
                    sortType: values[0],
                    sortDirectory: values[1]
                }
            });

            this.$emit("value",this.sortOrder.split(","));
        }
    }
}

</script>