<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
   components: { 
      AppHeader,
      AppFooter,
   }
}
</script>

<template>
   <div class="app-container">
     <AppHeader />
     <div class="main-content">
       <Transition name="fade">
         <router-view />
       </Transition>
     </div>
     <AppFooter />
   </div>
 </template>
 
 <style lang="scss">
 .app-container {
   display: flex;
   flex-direction: column;
   min-height: 100vh;
   background-color: #ffffff;
 }
 
 .main-content {
   flex: 1;
   position: relative;
 }
 
 // Definizione della transizione di dissolvenza
 .fade-enter-active, .fade-leave-active {
   transition: opacity 0.8s ease-in-out;
 }
 
 .fade-enter-from, .fade-leave-to {
   opacity: 0;
 }
 </style>
