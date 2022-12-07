<template>
    <div :class="{ active: visible }" class="song">
        <header></header>
        <div class="content">
            <div class="w">
                <div>
                    <h2>{{ playing.name }}</h2>
                    <p class="songinfo">
                        <span>歌手: {{ playing.arname }}</span>
                        <span>专辑: {{ playing.al }}</span>
                    </p>
                </div>
                <div class="lyric">
                    <pre>
                        {{ lyric }}
                    </pre>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePlayList } from '@/stores/playList'
const props = defineProps(['visible'])
const store = usePlayList()
const { lyric, playing } = storeToRefs(store)
console.log(lyric)
</script>

<style scoped>
.songinfo span{
    margin-right: 20px;
    color: #959595;
    font-size: 12px;
}
.lyric {
    width: 100%;
    height: 75%;
    overflow-y: auto;
}

.content {
    flex: 1;
    overflow-y: auto;
}

.w {
    width: 1100px;
    margin: 0 auto;
    height: 100%;
}

header {
    width: 100%;
    height: 65px;
}

.song {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 100px);
    position: fixed;
    background: linear-gradient(#b4b4b4 20%, white 55%);
    top: 0;
    transform: translateY(calc(100vh - 100px));
    transition: transform 0.2s;
    z-index: 97;
}

.active {
    transform: translateY(0);
}
</style>