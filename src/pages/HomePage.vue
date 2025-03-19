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
      <div class="cv-download-section">
      <div class="cv-card">
        <div class="cv-icon">
          <i class="fas fa-file-pdf"></i>
        </div>
        <div class="cv-content">
          <h3>Scarica il mio CV</h3>
          <p>Visualizza e scarica il mio curriculum vitae completo in formato PDF</p>
        </div>
        <a href="/public/CV Michele Fabio Pupo.pdf" download="Michele_Fabio_Pupo_CV.pdf" class="cv-button">
          <span class="cv-button-text">Scarica CV</span>
          <span class="cv-button-icon"><i class="fas fa-download"></i></span>
        </a>
      </div>
    </div>
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
  min-height: 100vh;
  background-color: #ffffff; /* Sfondo bianco per coerenza con le altre pagine */
  padding: 20px;
}

.splash-content {
  max-width: 800px;
  background: #F9DBBA; /* Richiama lo stile delle card delle pagine progetto */
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 1s ease-out;

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #03346E; /* Richiamo al blu scuro di header e footer */
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #03346E;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #03346E;
    margin-bottom: 1.5rem;
  }

  .description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #343a40;
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

.cv-download-section {
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

.cv-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  width: 100%;
  max-width: 650px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
}

.cv-icon {
  font-size: 2.5rem;
  color: #03346E;
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}

.cv-content {
  flex: 1;
  
  h3 {
    color: #03346E;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #555;
    font-size: 1rem;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
}

.cv-button {
  display: flex;
  align-items: center;
  background-color: #03346E;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #022652;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .cv-button-text {
    margin-right: 0.5rem;
  }
  
  .cv-button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>