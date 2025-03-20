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
            error: null
        }
    },
    
    methods: {
        sendContactRequest() {
            this.loading = true;
            this.success = false;
            this.error = null;
            
            axios.post('http://127.0.0.1:8000/api/new-contact', this.formData)
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
        <div class="contact-content">
            <div class="header-spacer"></div>
            
            <h2>Contattami</h2>
            
            <div v-if="success" class="alert-message success">
                <i class="fas fa-check-circle"></i>
                Messaggio inviato con successo! Ti risponderò al più presto.
            </div>
            
            <div v-if="error" class="alert-message error">
                <i class="fas fa-exclamation-circle"></i>
                {{ error }}
            </div>
            
            <form @submit.prevent="sendContactRequest()" class="contact-form">
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" name="name" v-model="formData.name" required>
                </div>
                
                <div class="form-group">
                    <label for="address">Indirizzo email</label>
                    <input type="email" id="address" name="address" v-model="formData.address" required>
                    <div class="form-helper">Non condivideremo la tua mail con terzi.</div>
                </div>
                
                <div class="form-group">
                    <label for="message">Messaggio</label>
                    <textarea id="message" name="message" v-model="formData.message" required></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="submit-button" :disabled="loading">
                        <span v-if="loading" class="spinner"></span>
                        {{ loading ? 'Invio in corso...' : 'Invia' }}
                    </button>
                    <router-link to="/" class="back-button">Indietro</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.contact-page {
  background-color: #ffffff;
  padding: 20px;
  padding-top: 150px;
  padding-bottom: 150px;
  min-height: calc(100vh - 300px); /* Regola in base all'altezza di header e footer */
  width: 100%;
}

.header-spacer {
    height: 60px;
}

.contact-content {
    max-width: 800px;
    background: #F9DBBA;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    animation: fadeIn 1s ease-out;
    margin: 0 auto;

    h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: #03346E;
    }
}

.alert-message {
    padding: 12px 16px;
    margin-bottom: 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    text-align: left;
    animation: fadeIn 0.5s ease-out;
    
    i {
        margin-right: 10px;
        font-size: 1.2rem;
    }
    
    &.success {
        background-color: rgba(76, 175, 80, 0.2);
        color: #2e7d32;
        border: 1px solid #2e7d32;
    }
    
    &.error {
        background-color: rgba(244, 67, 54, 0.2);
        color: #c62828;
        border: 1px solid #c62828;
    }
}

.contact-form {
    text-align: left;
    margin-top: 20px;
}

.form-group {
    margin-bottom: 20px;
    
    label {
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
        color: #03346E;
    }
    
    input, textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.8);
        transition: border-color 0.3s, box-shadow 0.3s;
        color: #333; /* Aggiungere questo per il colore del testo */
        
        &:focus {
            outline: none;
            border-color: #03346E;
            box-shadow: 0 0 0 2px rgba(3, 52, 110, 0.1);
        }
    }
    
    textarea {
        min-height: 200px;
        resize: vertical;
    }
    
    .form-helper {
        font-size: 0.8rem;
        color: #666;
        margin-top: 4px;
    }
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 30px;
}

.submit-button, .back-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
        transform: translateY(0);
    }
}

.submit-button {
    background-color: #03346E;
    color: white;
    border: none;
    cursor: pointer;
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }
}

.back-button {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
}

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

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .contact-content {
        padding: 20px;
        
        h2 {
            font-size: 1.4rem;
        }
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .submit-button, .back-button {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .contact-page {
        padding-top: 100px;
    }
    
    .contact-content {
        padding: 15px;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
}
</style>