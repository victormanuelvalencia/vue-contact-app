<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const user = ref({})
  const error = ref('')

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
    localStorage.clear()
    router.replace({ name: 'login' })
  }

  const goToContacts = () => {
    router.push({ name: 'contacts' })
  }
</script>

<template>
  <div class="profile-container">
    <div class="profile-card" role="main" aria-label="Perfil de usuario">
      <div class="avatar" tabindex="0" aria-label="Avatar del usuario">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-user" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="7" r="4"></circle>
          <path d="M5.5 21a7.5 7.5 0 0 1 13 0"></path>
        </svg>
      </div>
      <h1 class="welcome" tabindex="0">¡Bienvenido, {{ user.first_name || 'Usuario' }}!</h1>
      <p v-if="error" class="error-msg" role="alert">{{ error }}</p>
      <div v-else class="user-details" tabindex="0">
        <p><strong>Correo:</strong> {{ user.email || 'No disponible' }}</p>
        <p v-if="user.first_name"><strong>Nombre:</strong> {{ user.first_name }} {{ user.last_name }}</p>
      </div>

      <div class="buttons">
        <button class="btn contacts-btn" @click="goToContacts" aria-label="Ir a contactos">Ir a Contactos</button>
        <button class="btn logout-btn" @click="logout" aria-label="Cerrar sesión">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    min-height: 65vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .profile-card {
    background: #fff;
    max-width: 420px;
    width: 100%;
    padding: 40px 30px 35px;
    border-radius: 20px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
    text-align: center;
    color: #2c3e50;
    transition: box-shadow 0.3s ease;
  }

  .profile-card:hover,
  .profile-card:focus-within {
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  }

  .avatar {
    margin-bottom: 28px;
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    background: #eaf1fb;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.4s ease, transform 0.3s ease;
    cursor: default;
  }

  .avatar:focus,
  .avatar:hover {
    transform: scale(1.05);
    outline: none;
  }

  .icon-user {
    width: 64px;
    height: 64px;
    stroke: #3498db;
  }

  .welcome {
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: #34495e;
    user-select: none;
  }

  .user-details p {
    font-size: 1.15rem;
    margin: 8px 0;
    color: #555;
    user-select: text;
  }

  .error-msg {
    color: #e74c3c;
    font-weight: 700;
    margin-bottom: 20px;
    font-size: 1.15rem;
  }

  .buttons {
    margin-top: 30px;
    border-radius: 25px;
    display: flex;
    gap: 20px;
  }

  .btn {
    padding: 12px 28px;
    border: none;
    border-radius: 25px;
    font-size: 1.05rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    min-width: 140px;
    color: white;
    user-select: none;
  }

  .logout-btn {
    background-color: #e74c3c;

  }

  .logout-btn:hover,
  .logout-btn:focus-visible {
    background-color: #c0392b;
    transform: scale(1.05);
    outline: none;
  }

  .contacts-btn {
    background-color: #3498db;
  }

  .contacts-btn:hover,
  .contacts-btn:focus-visible {
    background-color: #2980b9;
    transform: scale(1.05);
    outline: none;
  }
</style>