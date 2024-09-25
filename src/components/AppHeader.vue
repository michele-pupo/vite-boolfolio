<script>

export default {
    name: 'AppHeader',
}

</script>


<template>
    <header>

        <nav class="navbar navbar-expand-lg">

            <div class="container-fluid">
                <router-link :to="{name: 'home'}" class="navbar-brand">Home</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

        </nav>

    </header>
</template>

<style lang="scss">

.navbar{
    width: 100%;
    height: 50px;
    z-index: 10;
    position: fixed;
    background-color: #03346E;
}

</style>