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
    <div>
        <div v-if="success" class="alert alert-success" role="alert">
            Messaggio inviato con successo! Ti risponderò al più presto.
        </div>
        
        <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>
        
        <form @submit.prevent="sendContactRequest()" class="mb-3">
            <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="name" name="name" v-model="formData.name" required>
            </div>
            
            <div class="mb-3">
                <label for="address" class="form-label">Indirizzo email</label>
                <input type="email" class="form-control" id="address" name="address" aria-describedby="emailHelp" v-model="formData.address" required>
                <div id="emailHelp" class="form-text">Non condivideremo la tua mail con terzi.</div>
            </div>
            
            <div class="form-floating mb-3">
                <textarea class="form-control" placeholder="Inserisci il tuo messaggio" id="message" name="message" style="height: 200px" v-model="formData.message" required></textarea>
                <label for="message">Messaggio</label>
            </div>
            
            <div class="d-flex gap-3">
                <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Invio in corso...' : 'Invia' }}
                </button>
                <router-link to="/" class="btn btn-secondary">Indietro</router-link>
            </div>
        </form>
    </div>
</template>