<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()


onBeforeMount(() => {
    authStore.userLogout()
    router.push({name: "login"})
})

</script>


<template>
    Logout Page
</template>