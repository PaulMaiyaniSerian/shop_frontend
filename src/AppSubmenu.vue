<template>
	<div>
        <AppTopBar />
        <div class="app-container">

          <div class="layout-main-container">
              <div class="layout-main">
                  <router-view />
              </div>
              <AppFooter />
          </div>
        </div>
        

	</div>
</template>

<script setup>
import AppTopBar from './AppTopbar.vue';

import AppFooter from './AppFooter.vue';


</script>

<style>
.app-container{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content:space-around;
  /* align-items: center; */
  align-content: center;
  gap: 1;
}
.layout-sidebar {
  padding: 0;
  width: 10%;
  /* background-color: #f1f1f1; */
  /* position: absolute; */
  height: 100%;
  /* overflow: auto; */
}

.layout-main-container{
  width: 80%;
  /* margin-left: 300px; */
  /* padding: 1px 16px; */
  /* height: 1000px; */
  /* background-color: #f1f1f1; */

}
</style>
