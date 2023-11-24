<template>
    <div class="product-item-wrapper">
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
                <td><div class="item-img"></div></td>
                <td>{{ item.modelName }}</td>
                <td>{{ item.title }}</td>
                <td>{{ getValue('year',item.properties) }}</td>
                <td>{{ getValue('km',item.properties) }} </td>
                <td>{{ getValue('color',item.properties) }}</td>
                <td class="item-price">{{ item.price }} TL</td>
                <td>{{ item.dateFormatted }} </td>
                <td>{{ item.location.cityName }} {{ item.location.townName }} </td>


            </tr>
        </table>
    </div>
</template>

<script>

export default {
    name: 'ProductItem',
    props: {
        products: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {};
    },
    methods: {

        getDetail(id){
            this.$router.push({ name: 'detail', params: { id } });
        },
        getValue(type,properties) {
            const yearObject = properties.find(property => property.name === type);
            return yearObject ? yearObject.value : '';

        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/css/ListPage.scss";
</style>
