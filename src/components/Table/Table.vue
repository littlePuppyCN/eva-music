<template>
    <el-table :row-class-name="highLight" @row-dblclick="onPlay" stripe :data="props.dataSource" style="width: 100%">
        <slot />
    </el-table>
</template>

<script setup>
import { getMusicUrl , getSongLyric } from '@/request/request.js'
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'
const store = usePlayList()
const { playing } = storeToRefs(store)
const { changePlaying, addToList ,changeLyric} = store
const props = defineProps(['dataSource'])


const onPlay = async (row) => {
    const res = await getMusicUrl(row.id)
    const lyric = await getSongLyric(row.id)
    const data = res.data[0]
    const setSongInfo = { ...data, ...row }
    changeLyric(lyric.lrc.lyric)
    changePlaying(setSongInfo)
    addToList(setSongInfo)
}

const highLight = ({row}) => {
    if(row.id == playing.value.id) {
        return 'table_row_active'
    }
    return ''
}

</script>

<style scoped>
.el-table :deep() .table_row_active td{
    background-color: #f5f7fa!important;
}
.el-table :deep() .table_row_active .song_name{
    color: #626aef!important;
}

</style>