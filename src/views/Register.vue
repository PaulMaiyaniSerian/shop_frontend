<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerApi } from '@/api/api_endpoint.js'
import { start_loader, stop_loader } from '@/helpers/loaders.js'
import { show_popup_success , show_popup_error} from '@/helpers/notifications.js'
import { useToast } from 'primevue/usetoast';

// notifications and popups
const toast = useToast()
// const checked = ref(true)

const router = useRouter()

const redirectToLogin = () => {
    router.push({name: 'login'})
}

// register form state def
const email = ref(null)
const emailErrors = ref([])
const password = ref(null)
const passwordErrors = ref([])
const password2 = ref(null)
const password2Errors = ref([])
const successMessage = ref(null)
const is_loading = ref(false)


// end

// register endpoint call
const callRegisterEndpoint = () => {
    start_loader(is_loading)
    const data = {
        'email': email.value,
        'password': password.value,
        'password2': password2.value
    }
    
    registerApi(data)
    .then(response => {
        successMessage.value = response.data
        // call success Toast here and wait for 2sec before redirect
        show_popup_success(toast, "Account Created succesfully", "SuccessFul")
        // start timeout of 2sec
        setTimeout(() => {
            stop_loader(is_loading)
            redirectToLogin()
        },1500)

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
            emailErrors.value = error_data.email
            passwordErrors.value = error_data.password
            password2Errors.value = error_data.password2

            show_popup_error(toast, "Please check your details", "Error")

        }
        stop_loader(is_loading)

    })

}
</script>

<template>
    <Toast position="top-center"/>

<div class="container login-container mt-4">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
    <div class="text-center mb-5">
        <img src="images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Register Account</div>
        <span class="text-600 font-medium line-height-3">Already have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="redirectToLogin">Login</a>
    </div>

    <div>
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" type="text" class="w-full mb-3" v-model="email" />
        <ul>
            <li class="errors" v-for="error in emailErrors">{{ error }}</li>
        </ul>


        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" type="password" class="w-full mb-3"  v-model="password" />
        <ul>
            <li class="errors" v-for="error in passwordErrors">{{ error }}</li>
        </ul>


        <label for="password2" class="block text-900 font-medium mb-2">Password(confirm)</label>
        <InputText id="password2" type="password" class="w-full mb-3" v-model="password2" />
        <ul>
            <li class="errors" v-for="error in password2Errors">{{ error }}</li>
        </ul>
        <!-- <div class="flex align-items-center justify-content-between mb-6">
            <div class="flex align-items-center">
                <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
            </div>
            <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
        </div> -->

        <Button label="Create Account" icon="pi pi-user" class="w-full" :loading="is_loading" @click="callRegisterEndpoint"></Button>
    </div>
    </div>
</div>


</template>

<style>
.login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}
</style>