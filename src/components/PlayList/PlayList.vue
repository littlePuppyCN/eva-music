<template>
    <div v-if="playListVisible" class="play_list">
        <header>
            <h3>当前播放</h3>
            <div class="bottom">
                <div class="all">
                    总282首
                </div>
                <div class="options">
                    <span>收藏全部</span>
                    <span @click="onCleanList">清空列表</span>
                </div>
            </div>
        </header>
        <div class="content">
            <TableVue :data-source="playList">
                <el-table-column show-overflow-tooltip class-name="pl8" width="220" label="音乐标题">
                    <template #default="scope">
                        <div style="display:flex;align-items:center;">
                            <span class="song_name" style="color:#507daf;">{{ scope.row.name }}</span>
                            <span class="scale" v-if="scope.row.sq != null">SQ</span>
                            <span class="scale" v-if="scope.row.fee == 1">VIP</span>
                            <span class="scale" v-if="scope.row.originCoverType == 1">原唱</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="arname" label="歌手" />
                <el-table-column show-overflow-tooltip prop="dt" label="时长" width="100" />
            </TableVue>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePlayList } from '@/stores/playList'
import TableVue from '../Table/Table.vue'
import { getLocalData } from '@/utils/utils.js'
import { onMounted } from 'vue'

const store = usePlayList()
const { playListVisible, playList } = storeToRefs(store)
const { replacePlayList, cleanPlayList } = store

const onCleanList = () => {
    cleanPlayList()
}

onMounted(() => {
    const cachePlayList = getLocalData('PLAY_LIST') || []
    replacePlayList(cachePlayList)
})
</script>

<style  scoped>
.scale {
    font-size: 14px;
    color: red;
    border: 1.5px solid red;
    padding: 0 2px;
    transform: scaleY(0.6) translateY(3px);
    margin-left: 6px;
    border-radius: 4px;
}

.options {
    font-size: 14px;
}

.options:hover {
    cursor: pointer;
}

.options span:last-child {
    color: #87a6c8;
    margin-left: 10px;
}

.all {
    font-size: 12px;
    color: #909399;
}

.bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 0;
}

h3 {
    font-weight: bold;
}

.play_list {
    width: 420px;
    height: 100%;
    position: absolute;
    right: 0;
    overflow-y: auto;
    box-shadow: 0px 0px 14px -6px rgb(0 0 0 / 30%);
    z-index: 99;
    background-color: white;
}

header {
    padding: 20px 20px 0 20px;
}
</style>