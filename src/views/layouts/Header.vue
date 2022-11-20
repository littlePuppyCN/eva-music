<script setup>
import {  useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMenuStore } from '@/stores/global'
import DropBar from '../../components/DropBar/DropBar.vue'
import { watch } from 'vue'

const router = useRouter()
const store = useMenuStore()
const { changeActive } = store
const keyword = ref('')
const dropBarVisible = ref(false) 
const history = ref(['我们都一样','old money','take me to the church','火车日记','你就不要想起我'])

watch(
    () => router.currentRoute.value.path,
    (n,o) => {
        if(n == o) return
        changeActive(n)
    }
)

const onSearch = async () => {
    const curPath = '/search'
    if(router.currentRoute.value.fullPath !== curPath){
        router.push({ path: curPath ,query:{keyword:keyword.value}})
        changeActive(curPath)
    }
    dropBarVisible.value = false
    if(history.value.includes(keyword.value)) return 
    history.value.unshift(keyword.value)
}

const onFocus = () => {
    dropBarVisible.value = true
}

const onBlur = () => {
    dropBarVisible.value = false
}

const onHistoryClick = (key) => {
    keyword.value = key
    onSearch()
}

const cleanHistory = () => {
    history.value = []
}

const goBack = () => {
    console.log(router)
}

</script>

<template>
    <header>
        <div id="leftBar">
            <div class="logo">追 忆 云 音 乐</div>
            <div class="searchBar">
                <div>
                    <span @click="router.go(-1)" class="go">&lt;</span>
                    <span @click="router.go(1)" class="back">&gt;</span>
                </div>
                <div style="position:relative;">
                    <DropBar @cleanHistory="cleanHistory" @onHotClick="onHistoryClick" @onHistoryClick="onHistoryClick" :history="history" @onBlur="onBlur" :visible="dropBarVisible" />
                    <input autocomplete="off" @click="onFocus"  v-model="keyword" id="search" type="text" @keydown.enter="onSearch" placeholder="搜索">
                </div>
            </div>
        </div>
        <div id="user">未登录</div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    background: #626aef;
    color: white;
    padding: 0 18px;
    justify-content: space-between;
}

#leftBar {
    display: flex;
}

.logo {
    font-size: 18px;
}

.searchBar {
    margin-left: 90px;
    display: flex;

}

.go,
.back {
    width: 22px;
    height: 22px;
    background: rgba(255, 255, 255, .3);
    display: inline-block;
    border-radius: 50%;
    line-height: 19px;
    text-align: center;
    margin-right: 10px;
}

.go:hover,
.back:hover {
    cursor: pointer;
    background-color: rgba(221, 217, 217, 0.3);
}

#search {
    height: 30px;
    width: 180px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, .3);
    border: none;
    margin-left: 30px;
    text-indent: 14px;
    color: white;
}

input:focus-visible {
    outline: none;
}
</style>
