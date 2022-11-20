<template>
    <div v-if="playListVisible" class="play_list">
        当前播放
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePlayList } from '@/stores/playList'
const store = usePlayList()
const { playListVisible } = storeToRefs(store)
const { changeVisible } = store
</script>

<style  scoped>
.play_list{
    width: 420px;
    height: 100%;
    position: absolute;
    right: 0;
    overflow-y: auto;
    box-shadow: 0px 0px 14px -6px rgb(0 0 0 / 30%);
}
</style>