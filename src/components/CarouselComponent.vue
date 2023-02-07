<script setup>
import { ref } from 'vue';

defineProps({
  products: {
    type: Object,
    required: true
  }
})


const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
]);
  


</script>

<template>
    <Carousel :value="products" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" class="custom-carousel" :circular="true" :autoplayInterval="3000">
        <template #header>
            <!-- <h5>Circular, AutoPlay, 3 Items per Page and Scroll by 1</h5> -->
        </template>
        <template #item="slotProps">
            <div class="product-item">
                <div class="product-item-content">
                    <div class="mb-3">
                        <img :src="slotProps.data.desktop_img" :alt="slotProps.data.name" class="product-image" />
                    </div>
                    <div>
                        <h4 class="mb-1">{{slotProps.data.name}}</h4>
                        <h6 class="mt-0 mb-3">${{slotProps.data.price}}</h6>
                        <!-- <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span> -->
                        <div class="car-buttons mt-5">
                              <Button icon="pi pi-shopping-cart" class="p-button p-button-rounded mr-2" />
                              <Button icon="pi pi-heart" class="p-button-success p-button-rounded mr-2" />
                              <Button icon="pi pi-wallet" class="p-button-help p-button-rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Carousel>

    
</template>


<style lang="scss" scoped>
.product-item {
    .product-item-content {
        // border: 1px solid var(--surface-border);
        border-radius: 3px;
        margin: .3rem;
        text-align: center;
        padding: 2rem 0;
    }

    .product-image {
        width: 50%;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }
}
</style>