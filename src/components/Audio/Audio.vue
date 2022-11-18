<template>
    <div>
        <audio preload :src="playing.url" type="audio/mp3" controls="controls" volume="0.5"  autoplay></audio>
    </div>
</template>

<script setup>
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'

const store = usePlayList()
const { playing } = storeToRefs(store)
</script>

<style scoped>

</style>