<script setup>
import { ref } from 'vue';
import { resp_options } from "@/responsive_options.js"
import { useCartStore } from "@/stores/cartStore.js"
import { useAuthStore } from "@/stores/authStore.js"
import { useToast } from 'primevue/usetoast';



const authStore = useAuthStore()
const toast = useToast()


defineProps({
  products: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
})
// initializations
const cartStore = useCartStore()

// state
const responsiveOptions = ref(resp_options);


const addToCart = (product) => {
    // check is user is not logged in z
	if(!authStore.getLoggedInUser().user_id){
        // send without token
        cartStore.addCartItem({
            product_id: product.id,
            device_id: cartStore.getDeviceId,
            qty: 1,
        }, toast)
    }else{
        // send with token
        cartStore.addCartItem({
            product_id: product.id,
            device_id: cartStore.getDeviceId,
            qty: 1,
            access_token: authStore.getAccessToken
        }, toast)
    }



    // cartStore.addCartItem(result)
    // console.log(cartStore.getCartItems)
}   


</script>

<template>
<Toast position="top-left"/>



  <div class="card">
      <Carousel :value="products" :numVisible="5" :numScroll="1" :responsiveOptions="responsiveOptions">
          <template #header>
              <h5>{{ title }}</h5>
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
                              <Button icon="pi pi-shopping-cart" class="p-button p-button-rounded mr-2" @click="addToCart(slotProps.data)" />
                              <Button icon="pi pi-heart" class="p-button-success p-button-rounded mr-2" />
                              <Button icon="pi pi-wallet" class="p-button-help p-button-rounded" />
                          </div>
                      </div>
                  </div>
              </div>
          </template>
      </Carousel>
  </div>
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
        width: 100%;
        height: auto;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }
}
</style>