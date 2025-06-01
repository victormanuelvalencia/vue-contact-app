<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>
        &copy; 2025 ContactApp. Creado por 
        <strong>Víctor Manuel Valencia Álvarez</strong> y 
        <strong>Juan José Hernández Velásquez</strong>.
      </p>
      <p class="footer-subtext">
        Proyecto para la materia <em>Frameworks de JavaScript</em>.
      </p>
    </div>
  </footer>
</template>
  
<style scoped>
  .app-footer {
    background: linear-gradient(90deg, #1b2735, #2c3e50);
    color: #ecf0f1;
    padding: 20px 0;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.2);
    margin-top: 40px;
  }
    
  .footer-content p {
    margin: 0;
    font-size: 1rem;
  }
    
  .footer-subtext {
    margin-top: 6px;
    font-size: 0.9rem;
    font-style: italic;
    color: #bdc3c7;
  }
    
  strong {
    color: #27ae60;
  }
    
  @media (max-width: 480px) {
    .app-footer {
      padding: 15px 10px;
    }
    .footer-content p {
      font-size: 0.9rem;
    }
  }
</style>