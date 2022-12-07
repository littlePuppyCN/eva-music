<template>
    <div>
        <div class="top">
            <span @click="emit('toSheet')" class="title">推荐歌单</span>
            <el-icon>
                <ArrowRight />
            </el-icon>
        </div>
        <div class="square_box">
            <Square @click="toRecommend" :data="{name:'追忆每日推荐音乐',picUrl:myBg,playCount:''}" />
            <Square v-for="sheet in props.data" :key="sheet.id" :data="sheet" />
        </div>
    </div>
</template>

<script setup>
import Square from '@/components/Square/index.vue'
import myBg from '@/assets/zy.jpg'
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits(['toSheet'])
const props = defineProps(['data'])

const toRecommend = () => {
    router.push('/recommend')
}

</script>

<style scoped>
.square_box{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.top{
    margin-bottom: 10px;
}
.title {
    font-size: 16px;
}

.title:hover {
    cursor: pointer;
    color: black;
}
</style>