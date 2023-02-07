<script setup>
import { ref, reactive, onMounted, onBeforeMount, watch } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useCartStore } from '@/stores/cartStore.js'
import { useRouter } from 'vue-router';
// configs and stores init
const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()
// watchers


// state
// global


// local
const userDetails = ref(null)
const account_label = ref(null)


const AccountNavItem = reactive({
	label:'Sign Inn',
	icon:'pi pi-fw pi-key',
	to: '/login',
})

// before components mount
onBeforeMount(() => {
    // check if there is a device id in cart store which checks in localstorage'
    if(cartStore.getDeviceId != null){
        // console.log(device_id)
		// console.log()
    }else{
		// call a function to create the device_id
		cartStore.createNewDeviceID()
	}
	
})

onMounted(() => {
	// create shoppingSession
	// check is user is logged in z
	// refactor to return promise and call the getitems after
	if(!authStore.getLoggedInUser().user_id){
		cartStore.createDeviceShoppingSession({
			// check is user is logged in z
			device_id: cartStore.getDeviceId,
			access_token: null
		})
		// initialize the cart items
		
		cartStore.getCartItemsFromServer({
			// check is user is logged in z
			device_id: cartStore.getDeviceId,
			access_token: null
		})
	}else{
		// if user is logged in create a Shopping session with user
		cartStore.createDeviceShoppingSession({
			device_id: cartStore.getDeviceId,
			access_token: authStore.getAccessToken
		})
		// init cart items
		cartStore.getCartItemsFromServer({
			// check is user is logged in z
			device_id: cartStore.getDeviceId,
			access_token: authStore.getAccessToken
		})
	}

	
})

// functions before mounted
const getLoggedInUser = () => {
	userDetails.value = authStore.getLoggedInUser()
	account_label.value = userDetails.value.email

	// no user here
	if(!account_label.value){
		account_label.value = "Account" 
	}else{
		// console.log("logged in")
		AccountNavItem.icon = 'pi pi-fw pi-lock'
		AccountNavItem.label = 'Log Out'
		AccountNavItem.to = '/logout'
	}
}


const redirectToCartPage = () => {
	router.push({name: 'cart'})
}

const redirectToHome = () => {
	router.push({name: 'home'})

}

// mounted
onMounted(() => {
	getLoggedInUser()
})
// functions after mount
// change login



const items = ref([
				{
					label: account_label,
					icon:'pi pi-fw pi-user',
					items:[
						AccountNavItem,
						
						{
							label:'My Account',
							icon:'pi pi-fw pi-user'
						},
						{
							label:'Orders',
							icon:'pi pi-fw pi-inbox'
						},
						{
							label:'Saved Items',
							icon:'pi pi-fw pi-heart'
						},
					]
				},
				
				{
					label:'Help',
					icon:'pi pi-fw pi-question',
					items:[
						{
							label:'Edit',
							icon:'pi pi-fw pi-pencil',
							items:[
								{
									label:'Save',
									icon:'pi pi-fw pi-calendar-plus'
								},
								{
									label:'Delete',
									icon:'pi pi-fw pi-calendar-minus'
								}
							]
						},
						{
							label:'Archieve',
							icon:'pi pi-fw pi-calendar-times',
							items:[
								{
									label:'Remove',
									icon:'pi pi-fw pi-calendar-minus'
								}
							]
						}
					]
				},
			
			]);
</script>

<template>
	<div>
		<Menubar :model="items">
			<template #start>
				<i class="pi pi-shopping-cart mr-4 p-text-secondary logo" size="large" style="font-size: 2rem" v-badge="'MyShop'" @click="redirectToHome"></i>
				<!-- <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2"> -->
			</template>

			<template #end>
				<div class="flex justify-content-center align-items-center ">
					<InputText placeholder="Search" type="text" class="mr-4"  />

					<i class="pi pi-shopping-cart mr-4 p-text-secondary cart-icon" size="large" style="font-size: 2rem" v-badge="cartStore.getCartCount" @click="redirectToCartPage"></i>
				</div>

				<!-- <Button type="button" label="Cart" size="large" icon="pi pi-shopping-cart" class="p-button-warning" badge="8" badgeClass="p-badge-danger" /> -->
			</template>
		</Menubar>

		<!-- <Button label="simulateLogin" @click="updateMenu"/> -->
	</div>
</template>

<style>
.cart-icon, .logo{
	cursor: pointer;
}
</style>