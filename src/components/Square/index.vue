<template>
    <div class="main">
        <div class="square" @click="onClick" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <img :src="data.picUrl" alt="">
            <div class="count">
                <el-icon>
                    <CaretRight />
                </el-icon>
                <span style="margin-left:2px;">{{ getChineseNumber(data.playCount) }}</span>
            </div>
            <div class="play" :style="{opacity:show?1:0}">
                <el-icon color="#626aef" size="24">
                    <CaretRight />
                </el-icon>
            </div>
        </div>
        <div class="name">
            {{ data.name }}
        </div>
    </div>
</template>

<script setup>
import { getChineseNumber } from '@/utils/utils.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps(['data'])
const show = ref(false)

const mouseenter = () => {
    show.value = true
}

const mouseleave = () => {
    show.value = false
}

const onClick = () => {
    if(props.data.picUrl === '/src/assets/zy.jpg') return 
    console.log('123123')
    router.push({name:'songsheet',params:{id:props.data.id}})
}

</script>

<style scoped>
.play {
    width: 30px;
    height: 30px;
    background-color: #f6f5f3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 15px;
    right: 10px;
    opacity: 0;
    transition: opacity 0.4s linear;
}

.square:hover {
    cursor: pointer;
}

.name {
    margin: 10px 0 20px;
}

.main {
    width: 205px;
}

.square {
    width: 100%;
    height: 205px;
    padding: 4px 4px 0 0;
    border-radius: 4px;
    position: relative;
}

img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 4px;
}

.count {
    text-align: right;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: white;
}
</style>