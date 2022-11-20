<template>
    <div class="initDiv" style="padding:20px 0 0 30px;">
        <TabsVue :currentTab="currentTab" :tabs="findTabs" @onTabClick="onTabClick" />
        <div style="margin-top:30px;">
            <Loading :loading="loading">
                <component :is="findTabs[currentTab].component" :data.sync="currentData"></component>
            </Loading>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Loading from '@/components/Loading/Loading.vue'
import Personal from './personal.vue'
import Custome from './custome.vue'
import TabsVue from '../../components/Tabs/Tabs.vue'

const loading = ref(false)
const currentTab = ref(0)
const currentData = ref(null)

const findTabs = [
    { name: '个性推荐', component: Personal },
    { name: '专属定制', component: Custome },
    { name: '歌单', component: Personal },
    { name: '排行榜', component: Personal },
    { name: '歌手', component: Personal },
    { name: '最新音乐', component: Personal },
]

const onTabClick = (tab, idx) => {
    console.log(tab, idx)
    currentTab.value = idx
    loading.value = false
}

</script>

<style scoped>

</style>