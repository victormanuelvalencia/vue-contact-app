<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="menu">
    <RouterLink :to="{ name: 'home' }" class="menu-link">Home</RouterLink>
    <RouterLink :to="{ name: 'contacts' }" class="menu-link">Contactos</RouterLink>
    <RouterLink :to="{ name: 'user-profile' }" class="menu-link">Cuenta</RouterLink>
  </nav>
</template>

<style scoped>
  .menu {
    display: flex;
    gap: 20px;
    background-color: #2c3e50;
    padding: 10px 20px;

    justify-content: center;
    align-items: center;
  }

  .menu-link {
    color: #ecf0f1;
    font-weight: 600;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .menu-link:hover {
    background-color: #3498db;
    color: white;
  }

  .menu-link.router-link-exact-active {
    background-color: #2980b9;
    color: white;
    font-weight: 700;
  }
</style>