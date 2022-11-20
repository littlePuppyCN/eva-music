<script setup>
import { RouterView } from 'vue-router'
import Header from './layouts/Header.vue'
import Menu from './layouts/Menu.vue'
import Footer from './layouts/Footer.vue'
import PlayListVue from '../components/PlayList/PlayList.vue'


</script>

<template>
    <div id="main">
        <header>
            <Header />
        </header>
        <main>
            <div class="menu"><Menu /></div>
            <div class="content"><RouterView /></div>
            <PlayListVue />
        </main>
        <div class="footer">
            <Footer />
        </div>
    </div>
</template>

<style scoped>
#main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
main{
    flex-grow: 1;
    display: flex;
}
main .content{
    position: relative;
    flex: 1;
}

.footer{
    width: 100%;
    height: 100px;
}
</style>
