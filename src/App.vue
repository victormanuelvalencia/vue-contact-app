<script setup>
  import { RouterView } from 'vue-router'
  import HeaderMain from './components/HeaderMain.vue';
  import FooterMain from './components/FooterMain.vue';
</script>

<template>
  <div class="app-container">
    <header-main />
    <main class="content">
      <RouterView />
    </main>
    <footer-main />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  background-color: #f5f6fa;     
}

.content {
  flex: 1; 
  padding: 1em;
  overflow-y: auto;
}
</style>

