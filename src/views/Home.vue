<script setup>
import { RouterView } from 'vue-router'
import Header from './layouts/Header.vue'
import Menu from './layouts/Menu.vue'
import Footer from './layouts/Footer.vue'
import PlayListVue from '../components/PlayList/PlayList.vue'
import Login from '@/views/login/index.vue'

</script>

<template>
    <div id="main">
        <Login />
        <header>
            <Header />
        </header>
        <main>
            <div class="menu">
                <Menu />
            </div>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <keep-alive include="iLike,find">
                        <component :is="Component"/>
                    </keep-alive>
                </router-view>
            </div>
            <PlayListVue />
        </main>
        <div class="footer">
            <Footer />
        </div>
        <!-- <router-view></router-view> -->
    </div>
</template>

<style scoped>
#main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

main {
    flex-grow: 1;
    display: flex;
    background: url('@/assets/azusa.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

main .content {
    position: relative;
    flex: 1;
    overflow: hidden;
    height: calc(100vh - 165px);
}

.footer {
    width: 100%;
    height: 100px;
}
</style>
