<script>
export default {
  name: 'HomePage',
}
</script>

<template>
  <div class="splash-page">
    <div class="splash-content">
      <h1>Michele Fabio Pupo</h1>
      <h2>Jr Full Stack Web Developer</h2>

      <!-- Immagine profilo circolare -->
      <img
        src="/download-photoaidcom-cropped.png"
        alt="Michele Fabio Pupo"
        class="profile-photo"
      />

      <p class="description">
        Sono una persona tenace e proattiva, determinata a raggiungere obiettivi con creatività e perseveranza. Ho maturato competenze avanzate nello sviluppo web, lavorando con tecnologie come HTML, CSS, JavaScript, Laravel e altre soluzioni moderne. La mia capacità di problem solving mi consente di individuare soluzioni efficaci e innovative, garantendo sempre il successo dei progetti a cui partecipo. Sono orientato alla collaborazione e motivato a contribuire con entusiasmo alla crescita di team e aziende nel settore tecnologico.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.splash-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a4870, #4169e1);
  color: #fff;
  text-align: center;
  padding: 20px;

  .splash-content {
    max-width: 800px;
    background: rgba(0, 0, 0, 0.4);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1s ease-out;

    h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }

    /* Stile per l'immagine profilo circolare */
    .profile-photo {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid #fff;
      margin-bottom: 1.5rem;
    }

    .description {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .dropdown select {
      background: #fff;
      color: #000;
      border: none;
      padding: 10px 20px;
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
}
</style>