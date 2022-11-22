<template>
    <div v-if="props.visible" id="drop" @click.stop>
        <div class="history">
            <div class="top">
                <span>
                    <span>
                        搜索历史
                    </span>
                    <span @click="delHistory">
                        <el-icon size="14">
                            <Delete />
                        </el-icon>
                    </span>
                </span>
                <span id="show_all" @click="onShowAll">查看全部</span>
            </div>
            <div :class="{ bar: !showAll }">
                <el-button @click="emit('onHistoryClick', his)" v-for="(his, dix) in props.history" :key="dix" round>
                    {{ his }}</el-button>
            </div>
        </div>
        <div>
            <p class="seach_name">热搜榜</p>
            <div @click="emitHotClick(list.searchWord)" class="seach_word" v-for="(list, idx) in hotList" :key="idx">
                <div :class="[{ hot: idx < 3 }, 'seach_index']">{{ idx + 1 }}</div>
                <div class="seach_info">
                    <div class="name">
                        <span>{{ list.searchWord }} </span>
                        <span><img class="img" v-if="list.iconUrl !== null" :src="list.iconUrl || ''" alt=""></span>
                        <span style="color:#d3d3d3;margin-left: 8px;">{{ list.score }}</span>
                    </div>
                    <div class="info">{{ list.content }}</div>
                </div>
            </div>
        </div>
    </div>
    <DialogVue :width="500" :visible="delHistoryVisible" @beforeClose="hideDialog" @onDialogConfirm="onDialogConfirm">
        <div style="text-align:center;">
            确定删除历史记录?
        </div>
    </DialogVue>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { globalClick } from '@/stores/global.js'
import { getHot } from '@/request/request.js'
import DialogVue from '../Dialog/Dialog.vue'

const props = defineProps(['visible', 'history'])
const emit = defineEmits(['onBlur', 'onHistoryClick', 'onHotClick', 'cleanHistory'])
const showAll = ref(false)
const hotList = ref([])
const delHistoryVisible = ref(false)

const emitVisible = () => {
    emit('onBlur')
}

const hideDialog = () => {
    console.log(123)
    delHistoryVisible.value = false
}

const onShowAll = () => {
    showAll.value = !showAll.value
}

const getHotList = async () => {
    const res = await getHot()
    hotList.value = res.data
}

const emitHotClick = (keyword) => {
    emit('onHotClick', keyword)
}

const delHistory = () => {
    delHistoryVisible.value = true
}

const onDialogConfirm = () => {
    emit('cleanHistory')
    delHistoryVisible.value = false
}

onMounted(() => {
    globalClick(emitVisible)
    getHotList()
})
</script>

<style scoped>
.seach_word:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.img {
    height: 13px;
    margin-left: 8px;
}

.seach_info {
    display: flex;
    flex-direction: column;
}

.seach_info .name {
    font-size: 12px;
    color: black;
}

.seach_info .info {
    font-size: 12px;
    color: #b2b2b2;
}

.seach_index {
    font-size: 16px;
    color: #d0d0d0;
    width: 30px;
    margin-left: 18px;
}

.hot {
    color: #ec4141;
}

.seach_word {
    color: #2c3e50;
    display: flex;
    align-items: center;
    height: 50px;
    margin-bottom: 10px;
}

.seach_name {
    text-indent: 18px;
    font-size: 14px;
    color: #2c3e50;
    margin: 10px 0 15px;
}

#drop {
    position: absolute;
    left: -25px;
    top: 42px;
    z-index: 999;
    width: 350px;
    height: 50vh;
    background: white;
    box-shadow: 0px 0px 14px -6px rgb(0 0 0 / 30%);
    border-radius: 4px;
    overflow-y: auto;
}

.history {
    display: flex;
    flex-direction: column;
    padding: 18px 18px 0 18px;
}

.top {
    display: flex;
    color: #2c3e50;
    align-items: center;
    font-size: 14px;
    justify-content: space-between;
    margin-bottom: 14px;
}

.top:hover {
    cursor: pointer;
}

.bar {
    max-height: 80px;
    overflow: hidden;
}
</style>