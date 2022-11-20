<template>
    <div class="search">
        <div>
            <div class="bar">
                搜索 {{ keyword }}
            </div>
            <TabsVue :currentTab="currentTab" :tabs="tabs" @onTabClick="onTabClick" />
        </div>
        <div>
            <Loading :loading="loading">
                <component :is="tabs[currentTab].component" :data.sync="currentData"></component>
            </Loading>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getSearchList } from '@/request/request.js'
import { watch, ref } from 'vue'
import Music from './music.vue'
import Singer from './singer.vue'
import Loading from '@/components/Loading/Loading.vue'
import TabsVue from '../../components/Tabs/Tabs.vue'
const router = useRouter()
const loading = ref(true)
const keyword = ref('')
const currentTab = ref(0)
const currentData = ref(null)

watch(
    () => router.currentRoute.value,
    async (n) => {
        loading.value = true
        keyword.value = n.query.keyword
        const res = await getSearchList({ keyword: keyword.value })
        currentData.value = res.result
        loading.value = false
    },
    { immediate: true }
)


const tabs = [
    { name: '单曲', component: Music, type: 1 },
    { name: '歌手', component: Singer, type: 100 },
    { name: '专辑', component: Singer, type: 10 },
    { name: '视频', component: Singer, type: 1014 },
    { name: '歌单', component: Singer, type: 1000 },
    { name: '歌词', component: Singer, type: 1006 },
    { name: '播客', component: Singer, type: 1009 },
    { name: '用户', component: Singer, type: 1002 },
]

const onTabClick = async (tab,idx) => {
    loading.value = true
    if (currentTab.value == idx) return
    currentTab.value = idx
    const res = await getSearchList({ keyword: keyword.value, type: tab.type })
    currentData.value = res.result
    loading.value = false
}

</script>

<style  scoped>


.search {
    padding: 20px 20px 0 20px;
    height: calc(100vh - 165px);
    overflow-y: auto;
}

.bar {
    color: black;
    font-size: 20px;
    font-weight: 600;
}

button {
    margin-right: 30px;
}

.navWrapper{
    margin: 20px 0;
}

.nav{
    color: #626060;
    margin-right: 20px;
}

.nav:hover{
    cursor: pointer;
    color: black;
}

.navActive{
    border-bottom: 2px solid #626aef;
    padding-bottom: 2px;
}
</style>