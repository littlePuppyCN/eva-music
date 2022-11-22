<template>
    <div>
        <TableVue :data-source="tableData">
            <el-table-column width="80">
                <template #default="scope">
                    <div style="display:flex;align-items:center;">
                        <span style="margin-right:12px;">
                            <span v-if="scope.row.id == playing.id">
                                <el-icon color="#626aef"><Headset /></el-icon>
                            </span>
                            <span v-else>
                                {{ tdIndex(scope.row.key) }}
                            </span>
                        </span>
                        <el-icon size="16" class="collect" @click="onCollect(scope.row)">
                            <Star color="red" v-if="scope.row.collect" />
                            <Star v-else />
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="音乐标题">
                <template #default="scope">
                    <div style="display:flex;align-items:center;">
                        <span class="song_name" style="color:#507daf;">{{ scope.row.name }}</span>
                        <span class="scale" v-if="scope.row.sq != null">SQ</span>
                        <span class="scale" v-if="scope.row.fee == 1">VIP</span>
                        <span class="scale" v-if="scope.row.originCoverType == 1">原唱</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="arname" label="歌手" />
            <el-table-column prop="al" label="专辑" />
            <el-table-column prop="dt" label="时长" width="100" />
            <el-table-column label="热度" width="200">
                <template #default="scope">
                    <div style="width:100px">
                        <el-progress :show-text="false" :percentage="scope.row.pop" :color="'#c3c3c4'" />
                    </div>
                </template>
            </el-table-column>
        </TableVue>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { ref, watch } from 'vue'
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'
import TableVue from '../../components/Table/Table.vue'
const store = usePlayList()
const { playing } = storeToRefs(store)
const { changePlaying } = store
const props = defineProps(['data'])
const priviteData = ref(props.data)

// 待修改 提到table内 props控制隐藏显示
watch(
    () => playing.value.id,
    async (n, o) => {
        if (n != o) return
        console.log(n)
        priviteData.value.songs.forEach((d, idx) => {
            if (n == d.id) {
                d.collect = playing.value.collect
            }
        })
    },
    { deep: true }
)

const tableData = computed(() => {
    return priviteData.value.songs.map((song, idx) => {
        return {
            key: idx + 1,
            name: song.name,
            arname: song.ar[0].name,
            al: song.al.name,
            sq: song.sq,
            id: song.id,
            dt: durationTrans(song.dt),
            originCoverType: song.originCoverType,
            pop: song.pop,
            fee: song.fee,
            collect: song.collect || false,
        }
    })
})

const tdIndex = computed(() => {
    return (key) => key >= 10 ? key : '0' + key
})

function durationTrans(mss) {
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    seconds = seconds >= 10 ? seconds : '0' + seconds
    minutes = minutes >= 10 ? minutes : '0' + minutes
    return minutes + ":" + seconds;
}

const onCollect = (row) => {
    console.log('我之星了')
    const isCollected = playing.value.collect
    if (isCollected != undefined && row.id == playing.value.id) {
        changePlaying({ ...playing.value, collect: !isCollected })
    }
    priviteData.value.songs.forEach((d, idx) => {
        if (row.key == (idx + 1)) {
            d.collect = !d.collect
        }
    })
}

</script>

<style scoped>
.collect:hover {
    cursor: pointer;
    color: red;
}

.scale {
    font-size: 14px;
    color: red;
    border: 1.5px solid red;
    padding: 0 2px;
    transform: scaleY(0.6) translateY(3px);
    margin-left: 6px;
    border-radius: 4px;
}
</style>