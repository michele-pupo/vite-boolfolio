<script>
export default {
  name: 'HomePage',
  data() {
    return {
      skills: [
        { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26' },
        { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
        { name: 'Sass', icon: 'fab fa-sass', color: '#CC6699' },
        { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
        { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#4FC08D' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
        { name: 'Laravel', icon: 'fab fa-laravel', color: '#FF2D20' },
        { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
      ],
      achievements: [
        { number: '700+', text: 'Ore di studio e sviluppo' },
        { number: '10+', text: 'Progetti completati' },
        { number: '2', text: 'Anni di esperienza tecnica' },
      ]
    }
  }
}
</script>

<template>
  <div class="splash-page">
    <div class="splash-content">
      <div class="header-spacer"></div>

      <!-- Immagine profilo circolare -->
      <img
        src="/download-photoaidcom-cropped.png"
        alt="Michele Fabio Pupo"
        class="profile-photo"
      />
      <h2>Jr Full Stack Web Developer</h2>

      <div class="quick-contact">
        <a href="#" class="contact-link">
          <i class="fas fa-envelope"></i>
          <span>mikypupowd@gmail.com</span>
        </a>
        <a href="#" class="contact-link">
          <i class="fas fa-phone"></i>
          <span>+39 389 992 8860</span>
        </a>
      </div>

      <p class="description">
        Sono una persona tenace e proattiva, determinata a raggiungere obiettivi con creatività e perseveranza. Ho maturato competenze avanzate nello sviluppo web, lavorando con tecnologie come HTML, CSS, JavaScript, Laravel e altre soluzioni moderne. La mia capacità di problem solving mi consente di individuare soluzioni efficaci e innovative, garantendo sempre il successo dei progetti a cui partecipo. Sono orientato alla collaborazione e motivato a contribuire con entusiasmo alla crescita di team e aziende nel settore tecnologico.
      </p>

      <!-- Sezione Skills -->
      <div class="skills-section">
        <h3>Competenze Tecniche</h3>
        <div class="skills-container">
          <div 
            v-for="skill in skills" 
            :key="skill.name" 
            class="skill-item"
          >
            <div class="skill-icon" :style="{ color: skill.color }">
              <i :class="skill.icon"></i>
            </div>
            <span class="skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <!-- Sezione Numeri/Risultati -->
      <div class="achievements-section">
        <div class="achievements-container">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.text" 
            class="achievement-item"
          >
            <div class="achievement-number">{{ achievement.number }}</div>
            <div class="achievement-text">{{ achievement.text }}</div>
          </div>
        </div>
      </div>

      <!-- Sezione Lingue -->
      <div class="languages-section">
        <h3>Lingue</h3>
        <div class="languages-container">
          <div class="language-item">
            <div class="language-name">Italiano</div>
            <div class="language-level">
              <div class="level-bar">
                <div class="level-fill" style="width: 100%"></div>
              </div>
              <span>Madrelingua</span>
            </div>
          </div>
          <div class="language-item">
            <div class="language-name">Inglese</div>
            <div class="language-level">
              <div class="level-bar">
                <div class="level-fill" style="width: 75%"></div>
              </div>
              <span>B2</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <router-link to="/project" class="cta-button">
          <span class="cta-button-text">Scopri di più</span>
          <span class="cta-button-icon"><i class="fas fa-arrow-right"></i></span>
        </router-link>
      </div>

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

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.splash-page {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px;
  padding-top: 150px;
  padding-bottom: 150px;
  overflow-y: auto; /* Aggiunto per permettere lo scroll della pagina intera */
  display: block; /* Cambiato da flex a block */
}

.header-spacer {
  height: 60px; /* Aggiusta in base all'altezza del tuo header */
}

.splash-content {
  max-width: 800px;
  background: #F9DBBA;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 1s ease-out;
  margin: 0 auto; /* Centra il contenuto orizzontalmente */
  overflow-y: visible; /* Rimosso lo scroll interno */
  margin-top: 20px; /* Aggiungi spazio sopra il contenuto */
  margin-bottom: 20px; /* Aggiungi spazio sotto il contenuto */

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #03346E;
  }
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #03346E;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #03346E;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #03346E;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }

  .quick-contact {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 1.5rem;
    
    .contact-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 20px;
      text-decoration: none;
      color: #03346E;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      
      i {
        font-size: 1rem;
      }
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
        transform: translateY(-2px);
      }
    }
  }

  .description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #343a40;
    padding: 0 10px;
  }
}

.skills-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 80px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .skill-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .skill-name {
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.achievements-section {
  margin: 2rem 0;
}

.achievements-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.achievement-item {
  background-color: #03346E;
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out;
  
  .achievement-number {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .achievement-text {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.languages-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.languages-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  .language-name {
    font-weight: 600;
    min-width: 80px;
  }
  
  .language-level {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .level-bar {
      flex: 1;
      height: 8px;
      background-color: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      
      .level-fill {
        height: 100%;
        background-color: #03346E;
        border-radius: 4px;
      }
    }
    
    span {
      font-size: 0.85rem;
      color: #6c757d;
      width: 90px;
      text-align: left;
    }
  }
}

.cta-section {
  margin: 2rem 0;
  
  .cta-button {
    display: inline-flex;
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
    
    .cta-button-text {
      margin-right: 0.5rem;
    }
    
    .cta-button-icon {
      display: flex;
      align-items: center;
      justify-content: center;
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

/* Responsive Styles */
@media (max-width: 768px) {
  .splash-content {
    padding: 20px;
    margin: 10px;
    
    h1 {
      font-size: 2.2rem;
    }
    
    h2 {
      font-size: 1.4rem;
    }
    
    .description {
      font-size: 1rem;
    }
  }
  
  .skills-container {
    gap: 0.7rem;
  }
  
  .skill-item {
    width: 70px;
    padding: 0.8rem;
    
    .skill-icon {
      font-size: 1.7rem;
    }
    
    .skill-name {
      font-size: 0.75rem;
    }
  }
  
  .achievements-container {
    gap: 0.7rem;
  }
  
  .achievement-item {
    padding: 1rem;
    min-width: 100px;
    
    .achievement-number {
      font-size: 1.7rem;
    }
    
    .achievement-text {
      font-size: 0.8rem;
    }
  }
  
  .quick-contact {
    flex-direction: column;
    align-items: center;
    
    .contact-link {
      width: 100%;
      justify-content: center;
    }
  }
}

@media (max-width: 480px) {
  .splash-content {
    padding: 15px;
    
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.2rem;
    }
    
    .profile-photo {
      width: 120px;
      height: 120px;
    }
    
    .description {
      font-size: 0.95rem;
    }
  }
  
  .languages-container .language-item {
    flex-direction: column;
    align-items: flex-start;
    
    .language-name {
      margin-bottom: 0.5rem;
    }
    
    .language-level {
      width: 100%;
    }
  }
  
  .skills-container {
    gap: 0.5rem;
  }
  
  .skill-item {
    width: 60px;
    padding: 0.7rem;
  }
  
  .header-spacer {
    height: 50px; /* Ridotto per schermi più piccoli */
  }
}
</style>