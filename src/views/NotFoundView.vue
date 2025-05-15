<template>
    <div class="not-found-container">
      <h1 class="error-code">404</h1>
      <h3 class="error-message">No pudimos encontrar la página :(</h3>
      <p class="suggestion">Verifica la URL o vuelve al <router-link to="home">inicio</router-link>.</p>
    </div>
</template>
  
<script setup>
</script>
  
<style scoped lang="css">
    .not-found-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #2c3e50;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
        padding: 20px;
    }
    
    .error-code {
        font-size: 8rem;
        margin: 0;
        color: #e74c3c;
    }
    
    .error-message {
        font-size: 1.8rem;
        margin-top: 10px;
    }
    
    .suggestion {
        margin-top: 20px;
        font-size: 1rem;
    
        a {
        color: #3498db;
        text-decoration: none;
        font-weight: bold;
        }
    
        a:hover {
        text-decoration: underline;
        }
    }
</style>