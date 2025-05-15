<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const user = ref({ name: '', email: '' }) // Se llenará luego desde API

    onMounted(() => {
        const isAuth = localStorage.getItem('isAuth') === 'true'
        if (!isAuth) {
            router.replace({ name: 'login' })
        }

    // Aquí se traen los datos del usuario desde la API 
    })

    const logout = () => {
        localStorage.setItem('isAuth', false)
        router.replace({ name: 'login' })
    }

    const goToContacts = () => {
        router.push({ name: 'contacts' })
    }
</script>

<template>
    <div class="profile-container">
        <h1>Acá va la tabla de tabulator con los contactos (Solo si el usuario está logueado)</h1>
        <h1>Si no está loguedo lo tira al login para que inicie sesión</h1>
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
</style>