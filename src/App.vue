<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
   components: { 
      AppHeader,
      AppFooter,
   },

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {

    },
}
</script>

<template>

   <AppHeader></AppHeader>
   
   <div class="my-app">
      
      <router-view></router-view>

   </div>

   <AppFooter></AppFooter>


</template>

<style lang="scss">
   .my-app{
      background-color: #1A4870;
      // height: calc(100% - 200px);
   }
</style>
