<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const login = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión')
    }

    // Guardar estado de autenticación
    localStorage.setItem('isAuth', 'true')
    localStorage.setItem('userEmail', email.value)
    

    router.push({ name: 'user-profile' })

  } catch (error) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="login-container">
      <h1>Ingresar al sistema</h1>

      <input type="email" v-model="email" placeholder="Correo electrónico" class="input" />
      <input type="password" v-model="password" placeholder="Contraseña" class="input" />

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <button :disabled="loading" @click="login" class="btn-login">
        {{ loading ? 'Accediendo...' : 'Acceder' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #f5f6fa;
}

.login-container {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 30px;
}

.input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1em;
  box-sizing: border-box;
}

.btn-login {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 14px 0;
  font-size: 1.1em;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-login:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.btn-login:hover:not(:disabled) {
  background-color: #2980b9;
}

.error-msg {
  color: red;
  margin-bottom: 20px;
}
</style>