<script setup>
import { onMounted, ref } from 'vue';
import { getCategoriesApi } from '@/api/api_endpoint.js'
import { start_loader, stop_loader } from '@/helpers/loaders.js'
import { show_popup_success , show_popup_error} from '@/helpers/notifications.js'

import { useToast } from 'primevue/usetoast';

// notifications and popups
const toast = useToast()

const categories = ref([])

onMounted(() => {

	// call the categories api
	getCategoriesApi()
	.then(response => {
    //   console.log(response.data)
      categories.value = response.data.map(value => {
		return {
			label: value.name,
			icon: value.icon,
			// to: "/login"
		}
	  })

	
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
	<!-- <h5>Categories</h5> -->
	<MegaMenu :model="categories" orientation="vertical"/>
</template>