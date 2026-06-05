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

      <div class="profile-wrapper">

        <img
          src="/download-photoaidcom-cropped.png"
          alt="Michele Fabio Pupo"
          class="profile-photo"
        />

        <div class="availability-badge">

          <span class="availability-dot"></span>

          Available

        </div>

      </div>

      <div class="hero-badge">
        Full Stack Web Developer
      </div>

      <h1 class="hero-title">
        Michele Fabio Pupo
      </h1>

      <div class="hero-status">

        <div class="status-item">
          <i class="fas fa-location-dot"></i>
          <span>Italy</span>
        </div>

        <div class="status-item">
          <i class="fas fa-rocket"></i>
          <span>Open to Opportunities</span>
        </div>

      </div>

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

        <h2>What I Build</h2>

        <p class="about-description">

            Progetto e sviluppo applicazioni web moderne orientate a
            performance, scalabilità ed esperienza utente.

            Mi occupo dell'intero ciclo di sviluppo, dalla progettazione
            del database alla realizzazione del backend con Laravel,
            fino alla creazione di interfacce moderne e responsive con Vue.js.

            Realizzo dashboard amministrative, API REST, sistemi gestionali
            e applicazioni web complete con particolare attenzione alla
            qualità del codice e alla manutenibilità del progetto.

        </p>

        <div class="about-specialties">

        <div class="specialty-card">

          <div class="specialty-icon">
            <i class="fas fa-laptop-code"></i>
          </div>

          <h3>Frontend</h3>

          <p>
            Vue.js, JavaScript, SCSS, responsive design
            e user experience moderna.
          </p>

        </div>

        <div class="specialty-card">

          <div class="specialty-icon">
            <i class="fas fa-server"></i>
          </div>

          <h3>Backend</h3>

          <p>
            Laravel, REST API, autenticazione,
            gestione dati e business logic.
          </p>

        </div>

        <div class="specialty-card">

          <div class="specialty-icon">
            <i class="fas fa-database"></i>
          </div>

          <h3>Database</h3>

          <p>
            MySQL, progettazione relazionale,
            query ottimizzate e gestione dati.
          </p>

        </div>

      </div>

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

.profile-wrapper {

  position: relative;

  display: inline-block;

  margin-bottom: 2rem;
}

.profile-photo {

  width: 180px;
  height: 180px;

  object-fit: cover;

  border-radius: 50%;

  border: 3px solid rgba(255,255,255,.15);

  box-shadow:
    0 0 60px rgba(139,92,246,.25);

  position: relative;

  z-index: 2;

  transition:
    transform .4s ease,
    box-shadow .4s ease;
}

.profile-photo:hover {

  transform:
    scale(1.04);

  box-shadow:
    0 0 80px rgba(139,92,246,.45);
}

.profile-wrapper::before {

  content: '';

  position: absolute;

  inset: -12px;

  border-radius: 50%;

  background:
    conic-gradient(
      from 0deg,
      #8B5CF6,
      #2563EB,
      #8B5CF6
    );

  animation:
    rotateGlow 8s linear infinite;

  opacity: .7;

  filter:
    blur(10px);

  z-index: 1;
}

@keyframes rotateGlow {

  from {

    transform:
      rotate(0deg);

  }

  to {

    transform:
      rotate(360deg);

  }
}

.availability-badge {

  position: absolute;

  bottom: 10px;

  right: -10px;

  display: flex;

  align-items: center;

  gap: .5rem;

  padding: .5rem .9rem;

  border-radius: 999px;

  background:
    rgba(15,23,42,.95);

  border:
    1px solid rgba(255,255,255,.08);

  font-size: .8rem;

  font-weight: 600;

  color: white;

  z-index: 20;
}

.availability-dot {

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #22C55E;

  animation:
    pulseDot 2s infinite;
}

@keyframes pulseDot {

  0% {

    box-shadow:
      0 0 0 0 rgba(34,197,94,.7);

  }

  70% {

    box-shadow:
      0 0 0 10px rgba(34,197,94,0);

  }

  100% {

    box-shadow:
      0 0 0 0 rgba(34,197,94,0);

  }
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

.hero-status {

  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 1rem;

  margin-top: 2rem;

  margin-bottom: 2rem;
}

.status-item {

  display: flex;

  align-items: center;

  gap: .6rem;

  padding: .8rem 1.2rem;

  border-radius: 999px;

  background:
    rgba(255,255,255,.05);

  border:
    1px solid rgba(255,255,255,.08);

  color:
    #CBD5E1;

  backdrop-filter:
    blur(10px);

  transition:
    .3s;
}

.status-item:hover {

  transform:
    translateY(-3px);

  border-color:
    rgba(139,92,246,.35);

  background:
    rgba(139,92,246,.08);
}

.status-item i {

  color:
    #8B5CF6;
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

.about-description {

  margin-bottom: 2rem;
}

.about-specialties {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 1rem;

  margin-top: 2rem;
}

.specialty-card {

  background:
    rgba(255,255,255,.03);

  border:
    1px solid rgba(255,255,255,.08);

  border-radius: 18px;

  padding: 1.5rem;

  text-align: center;

  transition: .3s;
}

.specialty-card:hover {

  transform:
    translateY(-6px);

  border-color:
    rgba(139,92,246,.35);
}

.specialty-icon {

  font-size: 2rem;

  color: #8B5CF6;

  margin-bottom: 1rem;
}

.specialty-card h3 {

  color: white;

  margin-bottom: .8rem;
}

.specialty-card p {

  color: #CBD5E1;

  font-size: .95rem;

  line-height: 1.7;
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

  .about-specialties {

    grid-template-columns: 1fr;
  }

  .stat-card {

    background:
      linear-gradient(
        rgba(255,255,255,.04),
        rgba(255,255,255,.02)
      );

    border:
      1px solid rgba(255,255,255,.08);

    backdrop-filter:
      blur(10px);
  }

  .stat-card:hover {

    transform:
      translateY(-6px);

    border-color:
      rgba(139,92,246,.35);

    box-shadow:
      0 20px 40px rgba(139,92,246,.15);
  }
}

</style>