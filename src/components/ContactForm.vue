<script>
import axios from 'axios'

export default {
    name: 'ContactForm',
    data() {
        return {
            formData: {
                name: '',
                address: '',
                message: '',
            },
            loading: false,
            success: false,
            error: null,
            apiBaseUrl: import.meta.env.VITE_API_URL,
        }
    },
    
    methods: {
        sendContactRequest() {
            this.loading = true;
            this.success = false;
            this.error = null;
            
            axios.post(`${this.apiBaseUrl}/new-contact`, this.formData)
                .then(response => {
                    console.log('Risposta API:', response);
                    this.success = true;
                    // Reset del form
                    this.formData = {
                        name: '',
                        address: '',
                        message: '',
                    };
                })
                .catch(error => {
                    console.error('Errore:', error);
                    this.error = error.response?.data?.message || 'Si è verificato un errore durante l\'invio';
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
}
</script>

<template>

  <div class="contact-page">

    <div class="contact-glow"></div>

    <div class="contact-container">

      <div class="contact-card">

        <div class="contact-header">

          <span class="contact-badge">
            Contact
          </span>

          <h1>
            Let's Work Together
          </h1>

          <p>
            Hai un progetto, una collaborazione o una proposta?
            Scrivimi e ti risponderò nel più breve tempo possibile.
          </p>

        </div>

        <div v-if="success" class="alert success">

          <i class="fas fa-circle-check"></i>

          Messaggio inviato con successo!

        </div>

        <div v-if="error" class="alert error">

          <i class="fas fa-circle-exclamation"></i>

          {{ error }}

        </div>

        <form
          @submit.prevent="sendContactRequest()"
          class="contact-form"
        >

          <div class="form-group">

            <label>Nome</label>

            <input
              type="text"
              v-model="formData.name"
              required
            >

          </div>

          <div class="form-group">

            <label>Email</label>

            <input
              type="email"
              v-model="formData.address"
              required
            >

          </div>

          <div class="form-group">

            <label>Messaggio</label>

            <textarea
              v-model="formData.message"
              required
            ></textarea>

          </div>

          <div class="form-actions">

            <button
              type="submit"
              class="submit-btn"
              :disabled="loading"
            >

              <span
                v-if="loading"
                class="spinner"
              ></span>

              {{ loading ? 'Sending...' : 'Send Message' }}

            </button>

            <router-link
              to="/"
              class="back-btn"
            >
              Back Home
            </router-link>

          </div>

        </form>

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>

.contact-page {

  min-height: 100vh;

  padding-top: 150px;
  padding-bottom: 100px;

  background:
    radial-gradient(
      circle at top,
      rgba(139,92,246,.18),
      transparent 40%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(37,99,235,.12),
      transparent 35%
    ),
    #070B14;

  position: relative;

  overflow: hidden;
}

.contact-glow {

  position: absolute;

  width: 700px;
  height: 700px;

  top: -250px;
  left: 50%;

  transform: translateX(-50%);

  background:
    radial-gradient(
      circle,
      rgba(139,92,246,.25),
      rgba(37,99,235,.15),
      transparent
    );

  filter: blur(120px);

  pointer-events: none;
}

.contact-container {

  max-width: 900px;

  margin: auto;

  padding: 0 2rem;

  position: relative;

  z-index: 2;
}

.contact-card {

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.08);

  backdrop-filter: blur(20px);

  border-radius: 30px;

  padding: 3rem;

  box-shadow:
    0 25px 60px rgba(0,0,0,.25);
}

.contact-header {

  text-align: center;

  margin-bottom: 2.5rem;
}

.contact-badge {

  display: inline-block;

  padding: .6rem 1rem;

  border-radius: 999px;

  background:
    rgba(139,92,246,.15);

  color:
    #C4B5FD;

  border:
    1px solid rgba(139,92,246,.25);

  margin-bottom: 1rem;

  font-size: .85rem;

  font-weight: 600;
}

.contact-header h1 {

  color: white;

  font-size: clamp(2rem,5vw,3.5rem);

  font-weight: 800;

  margin-bottom: 1rem;
}

.contact-header p {

  color: #94A3B8;

  max-width: 600px;

  margin: auto;

  line-height: 1.8;
}

.alert {

  display: flex;

  align-items: center;

  gap: .8rem;

  padding: 1rem;

  border-radius: 14px;

  margin-bottom: 1.5rem;
}

.success {

  background:
    rgba(34,197,94,.15);

  border:
    1px solid rgba(34,197,94,.25);

  color:
    #86EFAC;
}

.error {

  background:
    rgba(239,68,68,.15);

  border:
    1px solid rgba(239,68,68,.25);

  color:
    #FCA5A5;
}

.contact-form {

  display: flex;

  flex-direction: column;

  gap: 1.5rem;
}

.form-group {

  display: flex;

  flex-direction: column;
}

.form-group label {

  color: white;

  margin-bottom: .5rem;

  font-weight: 600;
}

.form-group input,
.form-group textarea {

  background:
    rgba(255,255,255,.04);

  border:
    1px solid rgba(255,255,255,.08);

  border-radius: 14px;

  padding: 1rem;

  color: white;

  font-size: 1rem;

  transition: .3s;
}

.form-group input:focus,
.form-group textarea:focus {

  outline: none;

  border-color:
    rgba(139,92,246,.5);

  box-shadow:
    0 0 0 4px rgba(139,92,246,.1);
}

.form-group textarea {

  min-height: 220px;

  resize: vertical;
}

.form-actions {

  display: flex;

  gap: 1rem;

  margin-top: 1rem;
}

.submit-btn,
.back-btn {

  flex: 1;

  text-align: center;

  text-decoration: none;

  border-radius: 14px;

  padding: 1rem;

  font-weight: 600;

  transition: .3s;
}

.submit-btn {

  border: none;

  cursor: pointer;

  color: white;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #2563EB
    );
}

.submit-btn:hover {

  transform:
    translateY(-3px);
}

.back-btn {

  color: white;

  background:
    rgba(255,255,255,.05);

  border:
    1px solid rgba(255,255,255,.08);
}

.back-btn:hover {

  background:
    rgba(255,255,255,.1);
}

.spinner {

  display: inline-block;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  border:
    2px solid rgba(255,255,255,.3);

  border-top:
    2px solid white;

  animation:
    spin .8s linear infinite;

  margin-right: .5rem;
}

@keyframes spin {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {

  .contact-card {

    padding: 1.5rem;
  }

  .form-actions {

    flex-direction: column;
  }
}

</style>