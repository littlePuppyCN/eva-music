<template>
   <Sheet @getComment="getComment" :id="route.params.id" :sheetInfo="sheetInfo" :comment="comment" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getSongSheet , getSheetComment } from '@/request/request.js'
import { onMounted , ref } from 'vue'
import Sheet from './index.vue'

const route = useRoute()
const sheetInfo = ref({})
const comment = ref({})

const getSheet = async () => {
    const res = await getSongSheet(route.params.id)
    sheetInfo.value = res.playlist
}

const getComment = async () => {
    const res = await getSheetComment(route.params.id)
    comment.value = res
}

onMounted(() => {
    getSheet()
    getComment()
})
</script>

<style scoped>

</style>