<script setup>
import { onMounted , reactive, ref} from 'vue';
import { useCartStore } from '../stores/cartStore';
import { getCartApi, getCartTotalApi } from "@/api/api_endpoint.js"
import { show_popup_success , show_popup_error} from '@/helpers/notifications.js'
import { useToast } from 'primevue/usetoast';

import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
// configs and stores init
const authStore = useAuthStore()
const cartStore = useCartStore()
// const router = useRouter()

// init state
const cart_items = ref([])
const toast = useToast()
const shopping_session = ref(null)

const getData = () => {
    var data = {}
    // call the getapi function
    if(!authStore.getLoggedInUser().user_id){
        data = {
            // check is user is logged in z
            device_id: cartStore.getDeviceId,
            access_token: null
        }
	}else{
		
		data = {
			// check is user is logged in z
			device_id: cartStore.getDeviceId,
			access_token: authStore.getAccessToken
		}
	}

    return data
}

const getShoppingSessionTotal = () => {
    var data = {}
    // call the getapi function
    if(!authStore.getLoggedInUser().user_id){
        data = {
            // check is user is logged in z
            device_id: cartStore.getDeviceId,
            access_token: null
        }
	}else{
		
		data = {
			// check is user is logged in z
			device_id: cartStore.getDeviceId,
			access_token: authStore.getAccessToken
		}
	}
    getCartTotalApi(data)
    .then(response => {
        // console.log(response.data)
        shopping_session.value = response.data.grand_total
        // show_popup_success(toast, "Product Added To Cart Successully", "Cart Add SuccessFul")
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
                console.log(error_data)
            //   show_popup_error(toast, "Error Adding To cart", "Cart Error")
            }
            // stop_loader(is_loading)
        })
}


const refreshCartApi = () => {
    var data = {}
    // call the getapi function
    if(!authStore.getLoggedInUser().user_id){
        data = {
            // check is user is logged in z
            device_id: cartStore.getDeviceId,
            access_token: null
        }
	}else{
		
		data = {
			// check is user is logged in z
			device_id: cartStore.getDeviceId,
			access_token: authStore.getAccessToken
		}
	}
    getCartApi(data)
        .then(response => {
            // console.log(response.data)
            cart_items.value = response.data
            // show_popup_success(toast, "Product Added To Cart Successully", "Cart Add SuccessFul")
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
                console.log(error_data)
            //   show_popup_error(toast, "Error Adding To cart", "Cart Error")
            }
            // stop_loader(is_loading)
        })
    
    getShoppingSessionTotal()
}

// const cartStore = useCartStore()

onMounted(() => {
    refreshCartApi()
})

const updateCartApi = (item) => {
    // check is user is not logged in z
	if(!authStore.getLoggedInUser().user_id){
        // send without token
        cartStore.updateCartItem({
            product_id: item.id,
            device_id: cartStore.getDeviceId,
            qty: item.quantity,
        }, toast, refreshCartApi)
    }else{
        // send with token
        cartStore.updateCartItem({
            product_id: item.id,
            device_id: cartStore.getDeviceId,
            qty: item.quantity,
            access_token: authStore.getAccessToken
        }, toast, refreshCartApi)
    }
    // cartStore.addCartItem(result)
    // console.log(cartStore.getCartItems)
} 
const updateCart = (cart_item) => {
    // console.log(cart_item.quantity)
    const item = {
        id: cart_item.product_id,
        quantity: cart_item.quantity
    }

    updateCartApi(item)
    // refreshCartApi()
}

const deleteCartItem = (cart_item) => {

}

</script>


<template>
    <Toast position="top-left"/>
    <div class="cart-container">

        <div class="cart-items">

            <div class="cart-item" v-for="cart_item in cart_items">

                <img class="cart-image" alt="cart-image" width="200" height="200" :src="cart_item.desktop_img"/>
                <p>
                    {{ cart_item.product_name }}
                </p>
                <b class="cart-price"> {{ cart_item.product_price }}</b>
                <input class="cart-qty" v-model="cart_item.quantity" type="number" />
                <p class="cart-total">Ksh: {{ cart_item.total }}</p>
                
                <Button label="update" @click="updateCart(cart_item)" class="cart_update_btn"/>

                <Button label="delete" @click="deleteCartItem(cart_item)" class="cart_update_btn button-warning"/>


                <!-- <Button label="update"/> -->
            </div>

        </div>

        <div class="cart-subtotal">
                <p>Total: Ksh: {{ shopping_session }}</p>
                <Button label="proceed to checkout"/>
        </div>

    </div>
</template>

<style scoped>
.cart-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
}
.cart-qty{
    text-decoration: none;
    padding: .5em;
    border: 2px solid gray;
    border-radius: 12px;
    width: 5rem;
}
.cart-items{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    border: 1px solid;
    padding: .5em;
}
.cart-item{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}
.cart-item p{
    display: inline-block;
}

.button-warning{
    background-color: brown;
    color: white;
}
</style>