<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMenuStore } from '@/stores/global'

const router = useRouter()
const store = useMenuStore()
const { changeActive } = store
 
const keyword = ref('')


const onSearch = async () => {
    const curPath = '/search'
    if(router.currentRoute.value.fullPath !== curPath){
        router.push({ path: curPath ,query:{keyword:keyword.value}})
        changeActive(999)
    }
}

</script>

<template>
    <header>
        <div id="leftBar">
            <div class="logo">追 忆 云 音 乐</div>
            <div class="searchBar">
                <div>
                    <span class="go">&lt;</span>
                    <span class="back">&gt;</span>
                </div>
                <div>
                    <input v-model="keyword" id="search" type="text" @keydown.enter="onSearch">
                </div>
            </div>
        </div>
        <div id="user">123</div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    background: #7c4f9c;
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
    background: #7d5896;
    display: inline-block;
    border-radius: 50%;
    line-height: 19px;
    text-align: center;
}

.go:hover,
.back:hover {
    cursor: pointer;
    background-color: #84629a;
}

#search {
    height: 30px;
    width: 180px;
    border-radius: 20px;
    background-color: #7d5896;
    border: none;
    margin-left: 30px;
    text-indent: 14px;
    color: white;
}

input:focus-visible {
    outline: none;
}
</style>
