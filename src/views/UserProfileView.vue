<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const user = ref({ name: '', email: '' }) // Objeto usuario vacío, luego se llenará desde API

    onMounted(() => {
        // Verifica si el usuario está autenticado en localStorage
        const isAuth = localStorage.getItem('isAuth') === 'true'
        if (!isAuth) {
            // Si no está autenticado, redirige al login
            router.replace({ name: 'login' })
        }

        // Aquí se agrega la llamada a la API para obtener datos del usuario
    })

    const logout = () => {
        // Al cerrar sesión, cambia el estado de autenticación y redirige a login
        localStorage.setItem('isAuth', false)
        router.replace({ name: 'login' })
    }

    const goToContacts = () => {
        // Navega a la página de contactos
        router.push({ name: 'contacts' })
    }
</script>

<template>
    <div class="profile-container">
        <h1>Bienvenido</h1>
        <!-- Muestra el correo del usuario, o "No disponible" si está vacío -->
        <p class="user-info">Correo: {{ user.email || 'No disponible' }}</p>

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