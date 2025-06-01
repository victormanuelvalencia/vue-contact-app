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
  /* Contenedor principal */
  .menu {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    gap: 28px;
    background: linear-gradient(90deg, #1b2735, #2c3e50);
    padding: 14px 32px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    user-select: none;
  }

  /* Enlaces */
  .menu-link {
    color: #ecf0f1;
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    padding: 10px 22px;
    border-radius: 25px;
    transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.3s ease;
    box-shadow: inset 0 0 0 0 transparent;
  }

  /* Hover y focus accesible */
  .menu-link:hover,
  .menu-link:focus-visible {
    background-color: #3498db;
    color: white;
    box-shadow: 0 0 10px #3498dbaa;
    outline: none;
  }

  /* Estado activo del link */
  .menu-link.router-link-exact-active {
    background-color: #27ae60;
    color: white;
    font-weight: 700;
  }

  /* Responsive para pantallas pequeñas */
  @media (max-width: 480px) {
    .menu {
      gap: 16px;
      padding: 12px 16px;
    }

    .menu-link {
      font-size: 1rem;
      padding: 8px 14px;
    }
  }
</style>