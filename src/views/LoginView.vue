<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Mail, Lock, Loader2 } from 'lucide-vue-next'

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

      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('userEmail', data.user.email)
      localStorage.setItem('userId', data.user.id)
      console.log('userId guardado en localStorage:', data.user.id)

      setTimeout(() => {
        loading.value = false
        router.push({ name: 'user-profile' })
      }, 1000)

    } catch (error) {
      errorMsg.value = error.message
      loading.value = false
    }
  }
</script>

<template>
  <div class="page-wrapper">
    <div class="login-card">
      <h1>Ingresar al sistema</h1>

      <div class="input-group">
        <Mail class="icon" />
        <input type="email" v-model="email" placeholder="Correo electrónico" />
      </div>

      <div class="input-group">
        <Lock class="icon" />
        <input type="password" v-model="password" placeholder="Contraseña" />
      </div>

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <button :disabled="loading" @click="login" class="btn-login">
        <template v-if="loading">
          <Loader2 class="spinner" /> Accediendo...
        </template>
        <template v-else>
          Acceder
        </template>
      </button>

      <p class="register-text">
        ¿Aún no tienes cuenta? 
        <router-link to="register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    margin: 60px;
    font-family: 'Inter', sans-serif;
  }

  .login-card {
    width: 100%;
    max-width: 420px;
    background-color: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    text-align: center;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    font-weight: 700;
    color: #34495e;
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
    background-color: #3498db;
    color: white;
    border: none;
    padding: 14px;
    font-size: 1.1em;
    border-radius: 25px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
    font-weight: 600;
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
    background-color: #2c80b4;
  }

  .spinner {
    animation: spin 1s linear infinite;
    width: 18px;
    height: 18px;
  }

  .register-text {
    margin-top: 25px;
    font-weight: 500;
    color: #2c3e50;
  }

  .register-text a {
    color: #3498db;
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s;
  }

  .register-text a:hover {
    outline: none;
    color: #1c5980;
    text-decoration: underline;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>