<script setup>
import { onMounted, ref } from 'vue';
import CarouselComponent from '../components/CarouselComponent.vue';
import ProductCarousel from '../components/ProductCarousel.vue';
import ProductBanner from '../components/ProductBanner.vue';
import { 
  getCarouselProductsApi,
  getCategoryIntroApi 
} from "@/api/api_endpoint.js";

// import { start_loader, stop_loader } from '@/helpers/loaders.js'
import { show_popup_success , show_popup_error} from '@/helpers/notifications.js'

import { useToast } from 'primevue/usetoast';


// notifications and popups 


const toast = useToast()

const carousel_products = ref([])

const electronic_products = ref([])

// onMounted
onMounted(() => {
  // get the product
  getCarouselProductsApi()
  .then(response => {
      carousel_products.value = response.data
    }).catch(error => {
        // console.log(error)
        // check whether error is from network or backend
        if(error.code == "ERR_NETWORK"){
            console.log("Network Error")
            show_popup_error(toast, "Cannot Connect to the server", "Network Error")
        }else{
            // error from the backend
            // console.log(error.response.data)
            const error_data = error.response.data
            // console.log(error_data)
            show_popup_error(toast, "Error Loading Carousel", "Error")

        }
        // stop_loader(is_loading)

    })

    // get intro products
    getCategoryIntroApi('electronics')
    .then(response => {
      // console.log(response.data)
      electronic_products.value = response.data
    }).catch(error => {
        // console.log(error)
        // check whether error is from network or backend
        if(error.code == "ERR_NETWORK"){
            console.log("Network Error")
            show_popup_error(toast, "Cannot Connect to the server", "Network Error")
        }else{
            // error from the backend
            // console.log(error.response.data)
            const error_data = error.response.data
            // console.log(error_data)
            show_popup_error(toast, "Error Loading Carousel", "Error")

        }
        // stop_loader(is_loading)

    })

})





</script>

<template>

  <div class="card">
    <CarouselComponent :products="carousel_products"/>
  </div>

  <!-- <div class="products-banner">
    <ProductBanner />
  </div> -->

  <ProductCarousel :products="electronic_products" title="electronics"/>



</template>


<style lang="scss" scoped>

</style>