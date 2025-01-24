<script setup>
import Mainview from './views/Mainview.vue'
import AsideView from './views/AsideView.vue'
</script>

<template>
  <div class="min-h-screen bg-[#c6f2e8] p-4">
    <!-- Container principal avec flex-col sur mobile et flex-row sur desktop -->
    <div class="flex flex-col lg:flex-row items-start justify-center gap-6 max-w-[1400px] mx-auto">
      <!-- AsideView avec margin-bottom sur mobile -->
      <div class="w-full lg:w-auto mb-6 lg:mb-0 lg:mr-2 ">
        <AsideView />
      </div>
      
      <!-- Mainview -->
      <div class="w-full ">
        <Mainview />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>