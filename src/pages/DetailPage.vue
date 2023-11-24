<template>
    <div class="container">

        <div class="detail-wrapper">
            <div class="detail-title-wrap">
                <div class="title">{{ this.product.title }}</div>
                <div class="location"><i class="fas fa-map-pin"></i>
                    {{ this.product.location.cityName }} {{ this.product.location.townName }}
                </div>

            </div>
            <div class="info-detail-wrapper">
                <div class="img-wrapper">AA</div>
                <div class="info-wrapper">
                    <div class="info-item">
                        <div class="item-title">Fiyat</div>
                        <div class="price">{{ this.product.priceFormatted }}</div>
                    </div>
                    <div class="info-item">
                        <div class="item-title">Yil</div>
                        <div class="item-value">{{ getValue('year', this.product.properties) }}</div>
                    </div>
                    <div class="info-item">
                        <div class="item-title">Kilometre</div>
                        <div class="item-value">{{ getValue('km', this.product.properties) }} km</div>
                    </div>

                    <div class="info-item">
                        <div class="item-title">Vites Tipi</div>
                        <div class="item-value">{{ getValue('gear', this.product.properties) }}</div>
                    </div>
                    <div class="info-item">
                        <div class="item-title">Renk</div>
                        <div class="item-value">{{ getValue('color', this.product.properties) }}</div>
                    </div>
                    <div class="info-item">
                        <div class="item-title">Yakit Tipi</div>
                        <div class="item-value">{{ getValue('fuel', this.product.properties) }}</div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script src="../js/DetailPage.js"></script>
<style lang="scss" scoped>
@import "@/css/DetailPage.scss";

</style>
