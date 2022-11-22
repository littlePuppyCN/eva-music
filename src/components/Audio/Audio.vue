<template>
    <div>
        <audio @ended="handleEnd" preload :src="playing.url" type="audio/mp3" controls="controls" volume="0.2"
            autoplay></audio>
    </div>
</template>

<script setup>
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const store = usePlayList()
const { playing, playList } = storeToRefs(store)
const { changePlaying } = store

const handleEnd = () => {
    // 当前播放完歌曲在播放列表中的index
    const indexInPlayList = playList.value.findIndex((song) => song.id == playing.value.id)
    // 如果当前是最后一首歌 则停止播放
    if (indexInPlayList == playList.value.length - 1) return
    const playNextIndex = indexInPlayList + 1
    changePlaying((playList.value)[playNextIndex])
}

watch(() => playList.value, (n) => {
    // 如果清空了当前播放列表 则停止播放音乐
    if (n.length == 0) {
        changePlaying({})
    }
})

</script>

<style scoped>

</style>