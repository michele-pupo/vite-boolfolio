<script>

import axios from 'axios'

export default {

    name: 'ContactForm',

    data() {
        return {
            // creo l'oggetto formData inizialmente vuoto
            formData: {
                name: '',
                address: '',
                message: '',
            },
        }
    },
    
    mounted() {
    
    },
    
    methods: {
        sendContactRequest() {
            // azioni da eseguire per inviarci la richiesta di contatto
            // console.log(this.formData);


            // quando facciamo delle richieste post ci servono due parametri: il primo e l'endpoint, il secondo è l'oggetto di dati che stiamo inviando
            axios.post('http://127.0.0.1:8000/api/new-contact', this.formData).then(res => {
                console.log('Risposta API:', res);
            });
        }
    },
}


</script>

<template>

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
        <textarea class="form-control" placeholder="Inserisci il tuo messaggio" id="message" name="message" style="height: 200px" v-model="formData.message"></textarea>
        <label for="message">Messaggio</label>
    </div>

    <div class="d-flex gap-3">
        <button type="submit" class="btn btn-primary">Invia</button>
        <router-link to="/" class="btn btn-secondary">Indietro</router-link>
    </div>
    

</form>

</template>

<style lang="scss">

</style>