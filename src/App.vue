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
   <AppHeader />

   <div class="my-app">
      <Transition name="fade">
         <router-view />
      </Transition>
   </div>

   <AppFooter />
</template>

<style lang="scss">
.my-app {
   background-color: #1A4870;
}

// Definizione della transizione di dissolvenza
.fade-enter-active, .fade-leave-active {
   transition: opacity 0.8s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
   opacity: 0;
}
</style>
