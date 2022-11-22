<template>
    <div class="wrapper">
        <el-carousel :interval="4000" type="card" height="198px" indicator-position="none">
            <el-carousel-item v-for="(item, idx) in bannerList" :key="idx">
                <img class="img" :src="item.imageUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getBanner } from '@/request/request.js'

const bannerList = ref([])

onMounted(async () => {
    const res = await getBanner()
    bannerList.value = res.banners
})

</script>

<style scoped>
.wrapper {
    text-align: center;
    width: 1100px;
    margin: 0 auto;
}

.img {
    width: 540px;
    height: 198px;
    border-radius: 4px;
}
</style>