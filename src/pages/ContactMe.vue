<script>

import ContactForm from '../components/ContactForm.vue';

export default {

    components: {
        ContactForm,
    }

}

</script>

<template>

    <div class="container my_contactform">
        <h1 class="mt-5">Contattami</h1>

        <ContactForm></ContactForm>
    </div>

</template>

<style lang="scss">
    .my_contactform{
        height: 1100px;
        overflow-y: auto;
        background-color: #1A4870;
    }
</style>