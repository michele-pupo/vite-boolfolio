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
        { name: 'Angular', icon: 'fab fa-angular', color: '#DD0031' },
        { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
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
  },

  methods: {
    copyToClipboard(text, event) {
      
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        this.showTooltip(event.target, 'Copiato negli appunti');
      } catch (err) {
        this.showTooltip(event.target, 'Impossibile copiare');
        console.error('Errore durante la copia: ', err);
      }
      
      document.body.removeChild(textArea);
    },
    showTooltip(element, message) {
      
      const linkElement = element.closest('.contact-link');
      if (!linkElement) return;
      
      // Crea un tooltip
      const tooltip = document.createElement('div');
      tooltip.classList.add('copy-tooltip');
      tooltip.textContent = message;
      
      // Aggiungi il tooltip accanto all'elemento
      linkElement.appendChild(tooltip);
      
      // Mostra il tooltip
      setTimeout(() => {
        tooltip.classList.add('visible');
      }, 10);
      
      // Rimuovi il tooltip dopo 2 secondi
      setTimeout(() => {
        tooltip.classList.remove('visible');
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      }, 2000);
    }
  }
}
</script>

<template>
  <div class="home-page">

    <!-- HERO -->
    <section class="hero-section">

      <div class="hero-glow"></div>

      <img
        src="/download-photoaidcom-cropped.png"
        alt="Michele Fabio Pupo"
        class="profile-photo"
      />

      <div class="hero-badge">
        Full Stack Web Developer
      </div>

      <h1 class="hero-title">
        Michele Fabio Pupo
      </h1>

      <p class="hero-description">
        Sviluppo applicazioni web moderne, performanti e scalabili
        utilizzando Laravel, Vue.js, MySQL e tecnologie frontend avanzate.
      </p>

      <div class="quick-contact">

        <a
          href="#"
          class="contact-link"
          @click.prevent="copyToClipboard('mikypupowd@gmail.com', $event)"
        >
          <i class="fas fa-envelope"></i>
          <span>mikypupowd@gmail.com</span>
        </a>

        <a
          href="#"
          class="contact-link"
          @click.prevent="copyToClipboard('+39 389 992 8860', $event)"
        >
          <i class="fas fa-phone"></i>
          <span>+39 389 992 8860</span>
        </a>

      </div>

      <div class="hero-buttons">

        <router-link
          to="/project"
          class="primary-btn"
        >
          View Projects
        </router-link>

        <a
          href="/CV%20Michele%20Fabio%20Pupo.pdf"
          target="_blank"
          class="secondary-btn"
        >
          Download CV
        </a>

      </div>

    </section>

    <!-- ABOUT -->
    <section class="about-section">

      <div class="glass-card">

        <h2>Chi sono</h2>

        <p>
          Sono una persona tenace e proattiva, determinata a raggiungere
          obiettivi con creatività e perseveranza.

          Ho maturato competenze nello sviluppo web lavorando con HTML,
          CSS, JavaScript, Laravel, Vue.js e tecnologie moderne.

          La mia capacità di problem solving mi consente di individuare
          soluzioni efficaci e innovative, garantendo sempre qualità e
          attenzione ai dettagli.
        </p>

      </div>

    </section>

    <!-- ACHIEVEMENTS -->
    <section class="achievements-section">

      <div class="achievements-container">

        <div
          v-for="achievement in achievements"
          :key="achievement.text"
          class="achievement-item"
        >
          <div class="achievement-number">
            {{ achievement.number }}
          </div>

          <div class="achievement-text">
            {{ achievement.text }}
          </div>
        </div>

      </div>

    </section>

    <!-- SKILLS -->
    <section class="skills-section">

      <h2>Tech Stack</h2>

      <div class="skills-container">

        <div
          v-for="skill in skills"
          :key="skill.name"
          class="skill-item"
        >

          <div
            class="skill-icon"
            :style="{ color: skill.color }"
          >
            <i :class="skill.icon"></i>
          </div>

          <span class="skill-name">
            {{ skill.name }}
          </span>

        </div>

      </div>

    </section>

    <!-- LANGUAGES -->
    <section class="languages-section">

      <div class="glass-card">

        <h2>Languages</h2>

        <div class="languages-container">

          <div class="language-item">

            <div class="language-name">
              Italiano
            </div>

            <div class="language-level">

              <div class="level-bar">
                <div
                  class="level-fill"
                  style="width:100%"
                ></div>
              </div>

              <span>Madrelingua</span>

            </div>

          </div>

          <div class="language-item">

            <div class="language-name">
              Inglese
            </div>

            <div class="language-level">

              <div class="level-bar">
                <div
                  class="level-fill"
                  style="width:75%"
                ></div>
              </div>

              <span>B2</span>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- CV -->
    <section class="cv-download-section">

      <div class="cv-card">

        <div class="cv-icon">
          <i class="fas fa-file-pdf"></i>
        </div>

        <div class="cv-content">

          <h3>Curriculum Vitae</h3>

          <p>
            Visualizza e scarica il mio curriculum completo.
          </p>

        </div>

        <a
          href="/CV%20Michele%20Fabio%20Pupo.pdf"
          target="_blank"
          class="cv-button"
        >
          Download
        </a>

      </div>

    </section>

  </div>
</template>

<style lang="scss">

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-page {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at top,
      rgba(139,92,246,.20),
      transparent 40%
    ),
    #070B14;

  color: white;

  padding-top: 130px;
  padding-bottom: 100px;

  overflow-x: hidden;
}

.hero-section {
  position: relative;

  max-width: 1200px;

  margin: auto;

  text-align: center;

  padding: 0 2rem;

  animation: fadeUp .8s ease;
}

.hero-glow {
  position: absolute;

  left: 50%;
  top: -120px;

  transform: translateX(-50%);

  width: 500px;
  height: 500px;

  background:
    radial-gradient(
      circle,
      rgba(139,92,246,.30),
      rgba(37,99,235,.15),
      transparent
    );

  filter: blur(100px);

  pointer-events: none;
}

.profile-photo {
  width: 180px;
  height: 180px;

  object-fit: cover;

  border-radius: 50%;

  border: 3px solid rgba(255,255,255,.15);

  box-shadow:
    0 0 60px rgba(139,92,246,.25);

  margin-bottom: 2rem;

  position: relative;
  z-index: 10;
}

.hero-badge {
  display: inline-block;

  background: rgba(255,255,255,.05);

  border: 1px solid rgba(255,255,255,.08);

  padding: .8rem 1.2rem;

  border-radius: 999px;

  color: #CBD5E1;

  margin-bottom: 1.5rem;

  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: clamp(3rem, 7vw, 5.5rem);

  font-weight: 800;

  line-height: 1.1;

  margin-bottom: 1.5rem;

  background:
    linear-gradient(
      135deg,
      #ffffff,
      #CBD5E1
    );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  max-width: 700px;

  margin: auto auto 2rem auto;

  color: #94A3B8;

  line-height: 1.8;

  font-size: 1.15rem;
}

.quick-contact {
  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 1rem;

  margin-bottom: 2rem;
}

.contact-link {
  display: flex;

  align-items: center;

  gap: .7rem;

  text-decoration: none;

  color: white;

  background: rgba(255,255,255,.05);

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 999px;

  padding: .9rem 1.2rem;

  transition: .3s;
}

.contact-link:hover {
  transform: translateY(-3px);

  border-color: rgba(139,92,246,.4);

  background: rgba(139,92,246,.08);
}

.hero-buttons {
  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 1rem;

  margin-bottom: 5rem;
}

.primary-btn {
  text-decoration: none;

  color: white;

  font-weight: 600;

  padding: 1rem 2rem;

  border-radius: 999px;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  transition: .3s;
}

.primary-btn:hover {
  transform: translateY(-3px);

  box-shadow:
    0 15px 35px rgba(99,102,241,.35);
}

.secondary-btn {
  text-decoration: none;

  color: white;

  font-weight: 600;

  padding: 1rem 2rem;

  border-radius: 999px;

  border: 1px solid rgba(255,255,255,.12);

  transition: .3s;
}

.secondary-btn:hover {
  background: rgba(255,255,255,.05);
}

.glass-card {
  background: rgba(255,255,255,.04);

  border: 1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(20px);

  border-radius: 24px;

  padding: 2rem;

  max-width: 1000px;

  margin: auto;
}

.glass-card h2 {
  color: white;

  margin-bottom: 1.5rem;

  text-align: center;
}

.glass-card p {
  color: #CBD5E1;

  line-height: 1.8;
}

.about-section,
.languages-section {
  padding: 2rem;
  margin-bottom: 3rem;
}

.skills-section {
  padding: 2rem;

  max-width: 1200px;

  margin: auto auto 4rem auto;
}

.skills-section h2 {
  text-align: center;

  margin-bottom: 2rem;
}

.skills-container {
  display: grid;

  grid-template-columns: repeat(auto-fit,minmax(120px,1fr));

  gap: 1rem;
}

.skill-item {
  background: rgba(255,255,255,.04);

  border: 1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(15px);

  border-radius: 18px;

  padding: 1.5rem;

  text-align: center;

  transition: .3s;
}

.skill-item:hover {
  transform: translateY(-8px);

  border-color: rgba(139,92,246,.35);
}

.skill-icon {
  font-size: 2rem;

  margin-bottom: .7rem;
}

.skill-name {
  color: #E2E8F0;
}

.achievements-section {
  max-width: 1200px;

  margin: auto auto 4rem auto;

  padding: 0 2rem;
}

.achievements-container {
  display: grid;

  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));

  gap: 1rem;
}

.achievement-item {
  background:
    linear-gradient(
      135deg,
      rgba(139,92,246,.20),
      rgba(37,99,235,.10)
    );

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 20px;

  padding: 2rem;

  text-align: center;
}

.achievement-number {
  font-size: 2.5rem;

  font-weight: 800;

  margin-bottom: .5rem;
}

.achievement-text {
  color: #CBD5E1;
}

.languages-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-item {
  background: rgba(255,255,255,.04);

  border-radius: 15px;

  padding: 1rem;
}

.language-name {
  margin-bottom: .5rem;

  font-weight: 600;
}

.level-bar {
  height: 10px;

  border-radius: 999px;

  overflow: hidden;

  background: rgba(255,255,255,.08);
}

.level-fill {
  height: 100%;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );
}

.cv-download-section {
  padding: 2rem;
}

.cv-card {
  max-width: 800px;

  margin: auto;

  background: rgba(255,255,255,.04);

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 24px;

  padding: 2rem;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 2rem;
}

.cv-icon {
  font-size: 3rem;

  color: #8B5CF6;
}

.cv-content h3 {
  margin-bottom: .5rem;
}

.cv-content p {
  color: #94A3B8;
}

.cv-button {
  text-decoration: none;

  color: white;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );

  padding: 1rem 1.8rem;

  border-radius: 999px;

  font-weight: 600;
}

@media (max-width: 768px) {

  .hero-section {
    padding: 0 1rem;
  }

  .profile-photo {
    width: 140px;
    height: 140px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .cv-card {
    flex-direction: column;
    text-align: center;
  }
}

</style>