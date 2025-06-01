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
    <p>
      Si ya tienes una cuenta, 
      <router-link to="login">accede</router-link> con tus credenciales. 
      Si no, 
      <router-link to="register">regístrate</router-link> para comenzar a disfrutar del sistema.
    </p>

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
  margin: 80px auto 0;
  padding: 40px 30px;
  max-width: 600px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #34495e;
  user-select: none;
}

a {
  color: #2980b9;
  font-weight: 600;
  transition: color 0.3s ease;
}

a:hover {
  color: #1c5980;
  text-decoration: underline;
}

h1 {
  font-size: 2.8em;
  margin-bottom: 12px;
  font-weight: 700;
  color: #34495e;
  font-weight: 700;
}

p {
  font-size: 1.15em;
  color: #4a5a6a;
  margin-bottom: 14px;
  line-height: 1.5;
}

.buttons {
  display: flex;
  gap: 30px;
  margin-top: 35px;
}

button {
  padding: 16px 34px;
  font-size: 1.15em;
  font-weight: 700;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  min-width: 160px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.login-btn {
  background-color: #3498db;
  color: white;
}

.login-btn:hover {
  background-color: #2980b9;
  transform: scale(1.07);
}

.register-btn {
  background-color: #2ecc71;
  color: white;
}

.register-btn:hover {
  background-color: #27ae60;
  transform: scale(1.07);
}

/* Responsive */
@media (max-width: 480px) {
  .account-options {
    margin: 60px 15px 0;
    padding: 30px 20px;
  }
  h1 {
    font-size: 2.2em;
  }
  p {
    font-size: 1em;
  }
  .buttons {
    flex-direction: column;
    gap: 18px;
  }
  button {
    min-width: 100%;
  }
}
</style>