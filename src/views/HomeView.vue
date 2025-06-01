<script setup>
</script>

<template>
  <main class="home-container" role="main" aria-label="Página de bienvenida a ContactApp">
    <h1 class="title">Bienvenido a ContactApp</h1>
    <p class="subtitle">Gestiona tus contactos de forma sencilla, segura y eficiente.</p>

    <section class="content">
      <p>
        Nuestra plataforma está diseñada para que puedas organizar, buscar y mantener tus contactos siempre actualizados.
      </p>

      <p>
        <strong>¿Nuevo por aquí? </strong>
        <RouterLink to="register" class="link">
          Regístrate
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </RouterLink>
        en unos pocos pasos y comienza a aprovechar todas las funcionalidades.
      </p>

      <p>
        Si ya tienes una cuenta, simplemente
        <RouterLink to="login" class="link">
          inicia sesión
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </RouterLink>
        y accede a tu espacio personal donde podrás administrar todos tus contactos sin complicaciones.
      </p>

      <p class="call-to-action" tabindex="0">
        No esperes más, regístrate y comienza a disfrutar de una gestión de contactos inteligente y moderna.
      </p>
    </section>
  </main>
</template>

<style scoped>
  .home-container {
    max-width: 920px;
    margin: 40px auto;
    padding: 30px 25px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 12px;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
    text-align: center;
    color: #2c3e50;
    background: #ffffff;
    transition: box-shadow 0.3s ease;
  }

  .title {
    font-size: 3.2rem;
    color: #27ae60;
    margin-bottom: 15px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.5rem;
    color: #34495e;
    margin-bottom: 40px;
    font-weight: 600;
    line-height: 1.4;
  }

  .content p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 25px;
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
  }

  .link {
    color: #3498db;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.25s ease;
  }

  .link:hover,
  .link:focus {
    color: #1c5980;
    outline: none;
    text-decoration: underline;
  }

  .icon {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
    stroke: currentColor;
    user-select: none;
  }

  .call-to-action {
    font-size: 1.35rem;
    font-weight: 700;
    color: #27ae60;
    margin-top: 30px;
    background: #e6f4ea;
    padding: 25px 25px;
    border-radius: 25px;
    box-shadow: inset 0 0 10px rgba(39, 174, 96, 0.15);
  }

  @media (max-width: 480px) {
    .home-container {
      margin: 40px 15px;
      padding: 25px 20px;
    }
    .title {
      font-size: 2.2rem;
    }
    .subtitle {
      font-size: 1.2rem;
      margin-bottom: 25px;
    }
    .content p {
      font-size: 1rem;
    }
    .call-to-action {
      font-size: 1.1rem;
      padding: 12px 18px;
    }
  }
</style>