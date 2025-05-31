<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({}) // nombre, apellido, email, etc.
const error = ref('')

// Función que se ejecuta al montar el componente
onMounted(async () => {
  const isAuth = localStorage.getItem('isAuth') === 'true'
  const email = localStorage.getItem('userEmail')

  if (!isAuth || !email) {
    return router.replace({ name: 'account-options' })
  }

  try {
    const response = await fetch(`http://localhost:3000/api/user?email=${encodeURIComponent(email)}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'No se pudo obtener el usuario')
    }

    user.value = data
  } catch (err) {
    error.value = err.message
  }
})

const logout = () => {
  localStorage.setItem('isAuth', 'false')
  localStorage.removeItem('userEmail')
  router.replace({ name: 'login' })
}

const goToContacts = () => {
  router.push({ name: 'contacts' })
}
</script>

<template>
  <div class="profile-container">
    <h1>Bienvenido</h1>
    <p v-if="error" class="error-msg">{{ error }}</p>
    <p v-else class="user-info">Correo: {{ user.email || 'No disponible' }}</p>
    <p v-if="user.first_name">Nombre: {{ user.first_name }} {{ user.last_name }}</p>

    <div class="buttons">
      <button class="logout-btn" @click="logout">Cerrar sesión</button>
      <button class="contacts-btn" @click="goToContacts">Ir a Contactos</button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.user-info {
  font-size: 1.1em;
  margin-bottom: 30px;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.logout-btn,
.contacts-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn {
  background-color: #e74c3c;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.contacts-btn:hover {
  background-color: #2980b9;
}
</style>