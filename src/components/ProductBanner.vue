<script setup>
import { ref } from 'vue';

// defineProps({
//   products: {
//     type: Object,
//     required: true
//   }
// })


</script>

<template>

    <div class="product-banner">
        <h2 class="title text-center">Title</h2>

        <div class="product-items">

            <a href="#" class="product-item" v-for="i in 3" style="background-image:url('https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')">

            </a>

        </div>

    </div>
    
</template>


<style lang="scss" scoped>
.product-items{
    display: flex;
    flex-direction: row;
    // flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    // background-color: yellow;

}
.product-item{
    width: calc(100% / 3);
    height: 200px;
    // background-color: rgb(124, 52, 11);
    display: inline-block;
    margin: 4px;
    background-repeat: no-repeat;
    background-size:100% 100%;
    background-position: center;
    // background-attachment: fixed;
    border-radius: 4px;


}


</style>