<template>
    <div>
        <LoadingVue :loading="loading">
            <div class="wrapper">
                <el-carousel :interval="4000" type="card" height="198px" indicator-position="none">
                    <el-carousel-item v-for="(item, idx) in bannerList" :key="idx">
                        <img class="img" :src="item.imageUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div style="margin-top:30px;">
                <RecommendSheet :data="recSheets" @toSheet="emit('toSheet')" />
            </div>
        </LoadingVue>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getBanner, getRecommandSheet } from '@/request/request.js'
import RecommendSheet from './components/recommendSheet.vue'
import LoadingVue from '../../components/Loading/Loading.vue';
const emit = defineEmits(['toSheet'])

const bannerList = ref([])
const recSheets = ref([])
const loading = ref(true)

onMounted(async () => {
    const sheets = await getRecommandSheet(9)
    const res = await getBanner()
    recSheets.value = sheets.result
    bannerList.value = res.banners
    loading.value = false
})

</script>

<style scoped>
.wrapper {
    text-align: center;
}

.img {
    width: 540px;
    height: 198px;
    border-radius: 4px;
}
</style>