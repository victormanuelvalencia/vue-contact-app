<script setup>
</script>

<template>
    <div class="home-container">
        <h1 class="title">Bienvenido a ContactApp</h1>
        <p class="subtitle">Gestiona tus contactos de forma sencilla, segura y eficiente.</p>

        <div class="content">
            <p>
                Nuestra plataforma está diseñada para que puedas organizar, buscar y mantener tus contactos siempre actualizados.
                <br /><br />
                <strong>¿Nuevo por aquí?</strong> <router-link to="register">Regístrate</router-link> en unos pocos pasos y comienza a aprovechar todas las funcionalidades.
                <br /><br />
                Si ya tienes una cuenta, simplemente <router-link to="login">inicia sesión</router-link> y accede a tu espacio personal donde podrás administrar todos tus contactos sin complicaciones.
            </p>

            <p class="call-to-action">
                No esperes más, regístrate y comienza a disfrutar de una gestión de contactos inteligente y moderna.
            </p>
        </div>
    </div>
</template>

<style scoped>
    .home-container {
    max-width: 720px;
    margin: 80px auto;
    padding: 30px 25px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #2c3e50;
    }

    .title {
    font-size: 3rem;
    color: #27ae60;
    margin-bottom: 10px;
    font-weight: 700;
    }

    .subtitle {
    font-size: 1.4rem;
    color: #34495e;
    margin-bottom: 30px;
    font-weight: 500;
    }

    .content p {
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 25px;
    }

    .highlight {
    font-weight: 600;
    font-size: 1.2rem;
    color: #2980b9;
    margin-bottom: 15px;
    }

    .features-list {
    list-style-type: disc;
    margin: 0 0 30px 20px;
    color: #34495e;
    font-size: 1.1rem;
    text-align: left;
    }

    .call-to-action {
    font-size: 1.25rem;
    font-weight: 600;
    color: #27ae60;
    margin-top: 10px;
    }

    @media (max-width: 480px) {
    .home-container {
        padding: 20px 15px;
    }

    .title {
        font-size: 2rem;
    }

    .subtitle, .content p, .features-list {
        font-size: 1rem;
    }
    }

    a {
        color: #3498db;
    }
</style>