<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => router.push({ name: 'login' })
const goToRegister = () => router.push({ name: 'register' })
</script>

<template>
  <div class="account-options">
    <h1>¡Hola! 👋</h1>
    <p>Aún no has iniciado sesión.</p>
    <p>Si ya tienes una cuenta, <router-link to="login">accede</router-link> con tus credenciales. Si no, <router-link to="register">regístrate</router-link> para comenzar a disfrutar del sistema.</p>

    <div class="buttons">
      <button class="login-btn" @click="goToLogin">Iniciar sesión</button>
      <button class="register-btn" @click="goToRegister">Registrarse</button>
    </div>
  </div>
</template>

<style scoped>
.account-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 100px;
  padding: 40px;
  background-color: #f4f6f8;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

a {
    color: #3498db;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #2c3e50;
}

p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

button {
  padding: 14px 28px;
  font-size: 1.1em;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-width: 150px;
}

.login-btn {
  background-color: #3498db;
  color: white;
}

.login-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.register-btn {
  background-color: #2ecc71;
  color: white;
}

.register-btn:hover {
  background-color: #27ae60;
  transform: scale(1.05);
}
</style>
