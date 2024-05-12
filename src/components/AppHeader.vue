<script>

export default {
    name: 'AppHeader',
}

</script>


<template>
    <header class="my_header">

        <nav class="navbar navbar-expand-lg bg-body-tertiary">

            <div class="container-fluid">
                <router-link :to="{name: 'home'}" class="navbar-brand">Progetti</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Tipi</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Tecnologie</a>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>

    </header>
</template>

<style lang="scss">

.my_header{
    width: 100%;
    z-index: 10;
    position: fixed;
}

</style>