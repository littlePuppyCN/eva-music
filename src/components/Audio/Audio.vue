<template>
    <div class="audio_wrapper" v-loading="urlLoading">
        <span v-for="m in mode" :key="m.type">
            <span @click="onMode" class="mode" style="margin-right:10px;"
                v-show="modeVisible == m.type">{{ m.name }}</span>
        </span>
        <el-icon :class="[{ diable: isFirstSong }]" @click="play(preSongIndex())" class="icon" size="22">
            <CaretLeft />
        </el-icon>
        <audio @play="emit('onplay')" @pause="emit('onpause')" @canplay="canplay" @timeupdate="timeupdate" @ended="play(nextSongIndex())" preload
            :loop="(modeVisible == 3)" :src="playing.id && `https://music.163.com/song/media/outer/url?id=${playing.id}.mp3`"
            type="audio/mp3" controls="controls" volume="0.2" autoplay></audio>
        <el-icon @click="play(nextSongIndex())" :class="[{ diable: isLastSong }]" class="icon" size="22">
            <CaretRight />
        </el-icon>
    </div>
</template>

<script setup>
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import { getSongLyric } from '@/request/request.js'
import { computed } from '@vue/reactivity'

const store = usePlayList()
const { playing, playList, urlLoading } = storeToRefs(store)
const { changePlaying, changeLyric, changeUrlLoading } = store
const props = defineProps(['audioIsPlaying'])
const emit = defineEmits(['onplay', 'onpause'])
const modeVisible = ref(1)

const mode = [
    { name: '顺序播放', type: 1 },
    { name: '随机播放', type: 2 },
    { name: '单曲循环', type: 3 },
    { name: '列表循环', type: 4 }
]

const timeupdate = (e) => {
    console.log(playing)
    console.log(e.target.currentTime)
} 

const onMode = () => {
    if (modeVisible.value == 4) {
        modeVisible.value = 1
    } else {
        modeVisible.value++
    }
}

const canplay = () => {
    changeUrlLoading(false)
}

const isLastSong = computed(() => {
    return currentSongIndex.value == playList.value.length - 1 && modeVisible.value === 1
})

const isFirstSong = computed(() => {
    return (currentSongIndex.value == 0 && modeVisible.value === 1) || playList.value.length == 0
})

const currentSongIndex = computed(() => {
    return playList.value.findIndex((song) => song.id == playing.value.id)
})

const getRamdomSong = () => {
    const min = 0
    const max = playList.value.length - 1
    const randNum = Math.floor(min + Math.random() * (max - min))
    return randNum
}

const nextSongIndex = () => {
    switch (modeVisible.value) {
        // 顺序
        case 1:
            return !isLastSong.value ? currentSongIndex.value + 1 : currentSongIndex.value
        // 随机播放
        case 2:
            const rand = getRamdomSong()
            return rand
        case 3:
            return currentSongIndex.value
        case 4:
            return isLastSong.value ? 0 : currentSongIndex.value + 1
        default:
            return

    }
}

const preSongIndex = () => {
    switch (modeVisible.value) {
        case 1:
            return currentSongIndex.value - 1
        case 2:
            const rand = getRamdomSong()
            return rand
        case 3:
            return currentSongIndex.value
        case 4:
            return currentSongIndex.value - 1
        default:
            return
    }
}

const getLyric = async (songID) => {
    const lyric = await getSongLyric(songID)
    changeLyric(lyric.lrc.lyric)
}

const play = (idx) => {
    if(idx < 0) return 
    const song = (playList.value)[idx]
    changePlaying(song)
    getLyric(song.id)
}

watch(() => playList.value, (n) => {
    // 如果清空了当前播放列表 则停止播放音乐
    if (n.length == 0) {
        changePlaying({})
    }
})

const songType = {
    VIP: 1
}

// 自动跳过vip歌曲
watch(
    () => playing.value,
    (n) => {
        // console.log(currentSongIndex.value)
        // console.log(isLastSong.value)
        if (n.fee === songType.VIP) {
            play(nextSongIndex())
        }
    },
    { deep: true }
)

</script>

<style scoped>
.mode {
    cursor: pointer;
}

audio {
    margin: 0 18px;
}

.diable {
    color: gray;
    cursor: not-allowed !important;
    user-select: none;
}

.audio_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.icon:hover {
    color: gray;
}
</style>