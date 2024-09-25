<script>

import { router } from '../router';


export default {
    name: 'AppFooter',
}

</script>


<template>

<footer>

    <div class="top-footer pt-3">
        <div class="d-flex justify-content-around">
            <div class="links">
                <ul class="d-flex gap-5">
                    <li><a href="https://github.com/michele-pupo" target="_blank">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/michele-fabio-pupo-727738308/" target="_blank">Linkedin</a></li>
                </ul>
            </div>
        </div>

        <div class="text-center d-flex justify-content-center gap-3 mb-5">
            <p>
                <small>Copyright (c): 2024 Boolean Classe #118</small>
            </p>
            <router-link :to="{name: 'contact-me'}" id="contact-me">Contattami</router-link>
        </div>
    </div>

</footer>

</template>


<style lang="scss">

.top-footer {
    bottom: 0;
    width: 100%;
    height: 100px;
    z-index: 10;
    position: fixed;
    background-color: #03346E;
    ul {
        list-style-type: none;
        padding: 0;
    }
}

#contact-me{
    text-decoration: none;
    color: red;
    transition: all .3s ease;
    margin-bottom: 10px;
    &:hover{
        background-color: rgba(131, 24, 24, 0.4);
    }
}

</style>