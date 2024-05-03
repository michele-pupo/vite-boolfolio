<script>

import { router } from '../router';


export default {
    name: 'AppFooter',
}

</script>


<template>

<footer>

    <div class="container">
        <div class="top-footer d-flex justify-content-around py-5">
            <div class="links">
                <h5>LINKS</h5>
                <ul>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                </ul>
            </div>
            <div class="links">
                <h5>LINKS</h5>
                <ul>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                </ul>
            </div>
            <div class="links">
                <h5>LINKS</h5>
                <ul>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                    <li>Link</li>
                </ul>
            </div>
        </div>

        <div class="bottom-footer text-center d-flex justify-content-center gap-3 mb-3">
            <p class="m-0">
                <small>Copyright (c): 2024 Boolean Classe #188 - Team 9</small>
            </p>

            <router-link :to="{name: 'contact-me'}" id="contact-me">Contattami</router-link>
        </div>



    </div>

</footer>

</template>


<style lang="scss">

footer {
    border-top: 1px solid white;

    ul {
        list-style-type: none;
        padding: 0;
    }
}

#contact-me{
    text-decoration: none;

    color: white;

    transition: all .3s ease;

    &:hover{
        background-color: rgba(255, 255, 255, 0.4);
    }
}

</style>