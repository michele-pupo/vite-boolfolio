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

        <div class="bottom-footer text-center">
            <p>
                <small>Copyright (c): 2024 Boolean Classe #188 - Team 9</small>
            </p>
        </div>


        <router-link :to="{name: 'contact-me'}">Contattami</router-link>

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

</style>