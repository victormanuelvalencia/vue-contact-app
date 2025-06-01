<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { User, Mail, Lock } from 'lucide-vue-next'

const router = useRouter()
const loading = ref(false)

const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const errorMsg = ref('')

// Validación simple: todos los campos llenos
const canRegister = computed(() =>
  email.value.trim() !== '' &&
  password.value.trim() !== '' &&
  firstName.value.trim() !== '' &&
  lastName.value.trim() !== ''
)

const register = async () => {
  if (!canRegister.value) {
    errorMsg.value = 'Por favor, llena todos los campos antes de registrar.'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        first_name: firstName.value,
        last_name: lastName.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar usuario')
    }

    // Aquí NO seteamos isAuth ni guardamos sesión
    // Solo redirigimos al login para que inicie sesión
    router.push({ name: 'login' })

  } catch (error) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="register-container">
      <h1>Regístrate</h1>

      <form @submit.prevent="register" class="form-grid" novalidate>
        <div class="input-group">
          <User class="icon" />
          <input type="text" v-model="firstName" placeholder="Nombre" required />
        </div>
        <div class="input-group">
          <User class="icon" />
          <input type="text" v-model="lastName" placeholder="Apellido" required />
        </div>
        <div class="input-group">
          <Mail class="icon" />
          <input type="email" v-model="email" placeholder="Correo electrónico" required />
        </div>
        <div class="input-group">
          <Lock class="icon" />
          <input type="password" v-model="password" placeholder="Contraseña" required />
        </div>
      </form>

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <button
        :disabled="loading || !canRegister"
        @click="register"
        class="btn-login"
        type="submit"
        aria-disabled="loading || !canRegister"
      >
        <template v-if="loading">
          <span class="spinner"></span> Registrando...
        </template>
        <template v-else>
          Registrarse
        </template>
      </button>
      <p class="login-text">
        ¿Ya tienes cuenta? 
        <router-link to="login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>


<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin: 60px;
  font-family: 'Inter', sans-serif;
}

.register-container {
  width: 100%;
  max-width: 850px;
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.form-grid {
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px 24px;
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #f1f3f6;
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  transition: border 0.3s;
}

.input-group:focus-within {
  border: 1px solid #3498db;
}

.input-group input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 1em;
  padding-left: 10px;
}

.icon {
  color: #7f8c8d;
  width: 20px;
  height: 20px;
}

.error-msg {
  color: #e74c3c;
  margin-bottom: 18px;
  font-weight: 500;
}

.btn-login {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 14px 0;
  font-size: 1.1em;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.btn-login:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.btn-login:hover:not(:disabled) {
  background-color: #27ae60;
}

.spinner {
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

.login-text {
  margin-top: 25px;
  font-weight: 500;
  color: #2c3e50;
}

.login-text a {
  color: #3498db;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s;
}

.login-text a:hover {
  outline: none;
  color: #1c5980;
  text-decoration: underline;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>