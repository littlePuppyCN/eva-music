<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useMenuStore } from '@/stores/global'
import { useLogin } from '@/stores/login.js'
import DropBar from '../../components/DropBar/DropBar.vue'
import { watch } from 'vue'
import { getLocalData, setLocalData } from '@/utils/utils.js'
import { storeToRefs } from 'pinia'

const loginStore = useLogin()
const router = useRouter()
const store = useMenuStore()
const { cookie, userInfo } = storeToRefs(loginStore)
const { changeVisible , handleLogout } = loginStore
const { changeActive, changeSongVisible } = store
const keyword = ref('')
const dropBarVisible = ref(false)
const history = ref([])
const { songPageVisible } = storeToRefs(store)

watch(
    () => router.currentRoute.value.path,
    (n, o) => {
        if (n == o) return
        changeActive(n)
    }
)

const logout = () => {
    handleLogout()
}

const onLogin = () => {
    changeVisible(true)
}

const onSearch = async () => {
    // 在歌曲详情页搜索 隐藏详情页
    if (songPageVisible.value) {
        changeSongVisible()
    }
    const curPath = '/search'
    if (router.currentRoute.value.fullPath !== curPath) {
        router.push({ path: curPath, query: { keyword: keyword.value } })
        changeActive(curPath)
    }
    dropBarVisible.value = false
    if (history.value.includes(keyword.value)) return
    history.value.unshift(keyword.value)
    setLocalData('HISTORY', history.value)
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
    setLocalData('HISTORY', [])
}

onMounted(() => {
    history.value = (getLocalData('HISTORY') || []).concat(history.value)
})

</script>

<template>
    <header :class="{ hide: songPageVisible }">
        <div id="leftBar">
            <div class="logo">
                <div :class="{ hide_logo: songPageVisible }">追 忆 云 音 乐</div>
            </div>
            <div class="searchBar">
                <div>
                    <span @click="router.go(-1)" class="go">&lt;</span>
                    <span @click="router.go(1)" class="back">&gt;</span>
                </div>
                <div style="position:relative;">
                    <DropBar @cleanHistory="cleanHistory" @onHotClick="onHistoryClick" @onHistoryClick="onHistoryClick"
                        :history="history" @onBlur="onBlur" :visible="dropBarVisible" />
                    <input autocomplete="off" @click="onFocus" v-model="keyword" id="search" type="text"
                        @keydown.enter="onSearch" placeholder="搜索喜欢的音乐">
                </div>
            </div>
        </div>
        <div><a style="{color:white;}" href="https://cloud.lazylan.top/" target="_blank">我的博客</a></div>
        <!-- <div v-if="!cookie.length" id="user" @click="onLogin">未登录</div>
        <div v-else style="display:flex;align-items: center;">
            <div class="userPic" :style="{ 'background-image': 'url(' + userInfo.profile?.avatarUrl + ')' }">
            </div>
            <el-dropdown>
                <span style="color:white;font-size:12px;margin-left:6px;cursor: pointer;">
                    {{ userInfo.profile?.nickname }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div> -->

    </header>
</template>

<style scoped>
a{
    color: white;
    text-decoration: none;
}
a:visited{
    color: white;
}
::-webkit-input-placeholder{
    color: rgba(255,255,225,.6);
}
.userPic {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
}

#user {
    color: #e0e0e0;
}

#user:hover {
    color: white;
    cursor: pointer;
}

.hide_logo {
    visibility: hidden;
}

.hide {
    background: transparent !important;
}

header {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    background: #626aef;
    color: white;
    padding: 0 18px;
    justify-content: space-between;
    z-index: 98;
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
