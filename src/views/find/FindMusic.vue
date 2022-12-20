<template>
    <div class="container" style="padding:20px 0 0 30px;">
        <TabsVue :currentTab="currentTab" :tabs="findTabs" @onTabClick="onTabClick" />
        <div class="wrapper">
            <div class="w">
                <Loading :loading="loading">
                    <KeepAlive>
                        <component @toSheet="toSheet" :is="findTabs[currentTab].component" :data.sync="currentData">
                        </component>
                    </KeepAlive>
                </Loading>
            </div>
        </div>
    </div>
</template>

<script>
export default { name:'find' }
</script>

<script setup>
import { ref } from 'vue'
import Loading from '@/components/Loading/Loading.vue'
import Personal from './personal.vue'
import Custome from './custome.vue'
import TabsVue from '../../components/Tabs/Tabs.vue'
import Sheet from './sheet.vue'
import Rank from './rank.vue'

const loading = ref(false)
const currentTab = ref(0)
const currentData = ref(null)

const findTabs = [
    { name: '个性推荐', component: Personal },
    { name: '专属定制', component: Custome },
    { name: '歌单', component: Sheet },
    { name: '排行榜', component: Rank },
    { name: '歌手', component: Personal },
    { name: '最新音乐', component: Personal },
]

const onTabClick = (tab, idx) => {
    console.log(tab, idx)
    currentTab.value = idx
    loading.value = false
}

const toSheet = () => {
    currentTab.value = 2
}

</script>

<style scoped>
.w {
    width: 1100px;
    margin: 0 auto;
}

.wrapper {
    flex-grow: 1;
    overflow-y: auto;
    margin-top: 30px;
}

.container {
    width: 100%;
    height: calc(100vh - 165px);
    display: flex;
    flex-direction: column;
}
</style>