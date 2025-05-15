<script setup>
    import { ref } from 'vue'     
    import { useRouter } from 'vue-router'  

    const router = useRouter()         
    const loading = ref(false) // Estado reactivo para manejar el estado de carga

    const email = ref('') // Variable reactiva para almacenar el email ingresado
    const password = ref('') // Variable reactiva para almacenar la contraseña

    const login = () => {
        loading.value = true // Activa el estado de carga para mostrar feedback
        setTimeout(() => { // Simula una llamada asincrónica (como a una API)
            localStorage.setItem('isAuth', 'true')  // Guarda en localStorage el estado de autenticación
            loading.value = false // Desactiva el estado de carga
            router.push({ name: 'contacts' })  // Redirige a la ruta de contactos tras "loguearse"
        }, 1000)
    }
</script>

<template>
    <div class="page-wrapper">
        <div class="register-container">
        <h1>Regístrate</h1>

        <!-- Campo para ingresar correo, enlazado con la variable email -->
        <input
            type="email"
            v-model="email"
            placeholder="Correo electrónico (Aún no funciona)"
            class="input"
        />

        <!-- Campo para ingresar contraseña, enlazado con la variable password -->
        <input
            type="password"
            v-model="password"
            placeholder="Contraseña (Aún no funciona)"
            class="input"
        />

        <!-- Botón para enviar el formulario, deshabilitado si loading es true -->
        <button :disabled="loading" @click="login" class="btn-login">
            {{ loading ? 'Accediendo...' : 'Acceder' }} <!-- Texto cambia si está cargando -->
        </button>
        </div>
    </div>
</template>

<style scoped>
    .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh; /* Ocupa toda la altura de la ventana */
    background-color: #f5f6fa;
    }

    .register-container {
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
    color: #2c3e50;
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
</style>