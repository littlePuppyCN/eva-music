<template>
    <section>
        <header>
            <h1>每日歌曲推荐</h1>
            <h5>根据你的音乐口味生成, 每天6:00更新</h5>
            <div>
                <el-button color="#626aef" type="primary" round :icon="Plus">播放全部</el-button>
                <el-button round :icon="Collection">收藏全部</el-button>
            </div>
        </header>
        <div class="main">
            <MusicVue :data="getRealSongs" :visible="['热度']" />
        </div>
    </section>
</template>

<script setup>
import {
    Plus,
    Collection
} from '@element-plus/icons-vue'
import MusicVue from '../search/music.vue'
import { getRecommandSongs } from '@/request/request.js'
import { onMounted, ref } from 'vue'
import { computed } from '@vue/reactivity';


const songs = ref([])

const getSongs = async () => {
    const res = await getRecommandSongs()
    songs.value = res.result
}

const getRealSongs = computed(() => {
    return {
        songs: songs.value.map((el) => {
            return {...el.song,isList:true}
        })
    }
})

onMounted(() => {
    getSongs()
})

</script>

<style scoped>
header {
    height: 170px;
    border-bottom: 1px solid #e0e0e0;
    padding: 30px 0 0 30px;
}

h1 {
    font-weight: bold;
}

h5 {
    margin-bottom: 30px;
}
</style>