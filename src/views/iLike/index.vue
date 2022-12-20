<template>
    <div>
        <h2 style="text-align:center;" v-if="!Object.keys(userInfo).length > 0">登录查看我喜欢的音乐</h2>
        <Sheet v-else :id="''" :sheetInfo="sheetInfo" :comment="[]" />
    </div>
</template>
 
<script>
export default { name:'iLike' }
</script>

<script setup>
import { onMounted, ref, watch ,toRef} from 'vue'
import { useLogin } from '@/stores/login'
import Sheet from '@/views/songSheet/index.vue'
import { storeToRefs } from 'pinia'
import { getLikeList , getSong } from '@/request/request.js'
import { getLocalData } from '@/utils/utils.js'
import LoadingVue from '../../components/Loading/Loading.vue'

const store = useLogin()
const { userInfo } = storeToRefs(store)
const { changeUserInfo } = store
const sheetInfo = ref({})
const loading = ref(false)

const getSheet = async (id) => {
    const res = await getLikeList(id)
    const resSong = await getSong(res.ids)
    sheetInfo.value = {
        tracks:resSong.songs.map((s) => {
            return {
                ...s,
                collect:true
            }
        }),
        creator:{
            avatarUrl:userInfo.value.profile.avatarUrl,
            nickname:userInfo.value.profile.nickname,
        },
        createTime:userInfo.value.account.createTime,
        coverImgUrl:userInfo.value.profile.backgroundUrl,
        name:'我喜欢的音乐'
    }
}


watch(
    () => userInfo.value,
    async (n) => {
        await getSheet(n.account.id)
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