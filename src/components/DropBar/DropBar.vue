<template>
    <div v-if="props.visible" id="drop" @click.stop>
        <div class="history">
            <div class="top">
                <span>搜索历史
                    <el-icon size="14">
                        <Delete />
                    </el-icon>
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
                <div :class="[{hot:idx < 3},'seach_index']">{{idx+1}}</div>
                <div class="seach_info">
                    <div class="name">{{ list.searchWord }}</div>
                    <div class="info">{{ list.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { globalClick } from '@/stores/global.js'
import { getHot } from '@/request/request.js'

const props = defineProps(['visible', 'history'])
const emit = defineEmits(['onBlur', 'onHistoryClick', 'onHotClick'])
const showAll = ref(false)
const hotList = ref([])

const emitVisible = () => {
    emit('onBlur')
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

onMounted(() => {
    globalClick(emitVisible)
    getHotList()
})
</script>

<style scoped>
.seach_info{
    display: flex;
    flex-direction: column;
}

.seach_info .name{
    font-size: 12px;
    color: black;
}

.seach_info .info{
    font-size: 12px;
    color: #b2b2b2;
}
.seach_index{
    font-size: 16px;
    color: #d0d0d0;
    width: 30px;
}

.hot{
    color: #ec4141;
}
.seach_word {
    color: #2c3e50;
    display: flex;
    height: 45px;
    align-items: center;
}

.seach_name {
    font-size: 14px;
    color: #2c3e50;
    margin: 10px 0 15px;
}

#drop {
    position: absolute;
    padding: 18px 18px 0 18px;
    left: -25px;
    top: 42px;
    z-index: 999;
    width: 350px;
    height: 50vh;
    background: white;
    box-shadow: 0px 0px 14px -2px rgb(0 0 0 / 30%);
    border-radius: 4px;
    overflow-y: auto;
}

.history {
    display: flex;
    flex-direction: column;
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
    height: 80px;
    overflow: hidden;
}
</style>