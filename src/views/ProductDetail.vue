<script setup>
import { ref } from 'vue';


</script>

<template>

  <div class="product_image_container">

    <div class="product_image">
        <img src="" alt="product main image" width="400" height="400">

        <div class="product_image_select">
            
        </div>
    </div>

    <div class="product_details">
        <h3>Wrist Watch</h3>
        <h4 class="deleted">old: $23000</h4>
        <h4>new: $1000</h4>

        <div class="product_actions">
            <Button label="Add to Cart" icon="pi pi-shopping-cart"></Button>
            <!-- <Button label="Buy" icon="pi pi-eye"></Button> -->
            <Button label="Add to Wishlist" icon="pi pi-heart"></Button>
        </div>
    </div>

    
    
  </div>

  <div class="product_descrptpn">
    <h3 class="text-center">Description</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quasi soluta voluptas ratione veritatis illo!
         Iure, quisquam eius pariatur exercitationem assumenda accusamus minus,
          repellat, libero esse quibusdam ad illum cum.
    </p>
  </div>    



</template>


<style lang="scss" scoped>
.product_details{
    // background-color: #a8a3a3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.product_image_container{
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}
.product_image{
    width: 400px;
    height: 400px;
    border: 2px solid #a8a3a3;
}

.product_actions{
    // border: 2px solid green;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>