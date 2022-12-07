<template>
    <Sheet :id="''" :sheetInfo="sheetInfo" :comment="[]" />
</template>
 
<script>
export default { name:'iLike' }
</script>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useLogin } from '@/stores/login'
import Sheet from '@/views/songSheet/index.vue'
import { storeToRefs } from 'pinia'
import { getLikeList , getSong } from '@/request/request.js'
import { getLocalData } from '@/utils/utils.js'

const store = useLogin()
const { userInfo } = storeToRefs(store)
const { changeUserInfo } = store
const sheetInfo = ref({})

const getSheet = async (id) => {
    const res = await getLikeList(id)
    const resSong = await getSong(res.ids)
    sheetInfo.value = {
        tracks:resSong.songs,
        creator:{
            avatarUrl:userInfo.value.profile.avatarUrl,
            nickname:userInfo.value.profile.nickname,
        },
        createTime:userInfo.value.account.createTime,
        coverImgUrl:userInfo.value.profile.backgroundUrl
    }
}


watch(
    () => userInfo.value,
    (n) => {
        getSheet(n.account.id)
    },
    {  deep: true }
)

onMounted(() => {
    const localUserInfo = getLocalData('USER')
    if (localUserInfo && Object.keys(localUserInfo).length > 0) {
        changeUserInfo({...localUserInfo})
    }
})

</script>   
 
<style scoped>

</style>