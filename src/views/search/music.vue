<template>
    <div>
        <el-skeleton style="width:80%;" :loading="!closeLoading && !tableData.length > 0" animated>
            <template #default>
                <el-table :row-class-name="highLight" @row-dblclick="onPlay" stripe :data="tableData"
                    style="width: 100%">
                    <!-- <TableVue :data-source="tableData"> -->
                    <el-table-column width="80" v-if="!props.visible.includes('firts') ? true : false">
                        <template #default="scope">
                            <div style="display:flex;align-items:center;">
                                <span style="margin-right:12px;">
                                    <span v-if="scope.row.id == playing.id">
                                        <el-icon color="#626aef">
                                            <Headset />
                                        </el-icon>
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
                    <el-table-column show-overflow-tooltip label="音乐标题">
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
                    <el-table-column prop="al" label="专辑" v-if="!props.visible.includes('al')" />
                    <el-table-column prop="dt" label="时长" width="100" />
                    <el-table-column label="热度" width="200" v-if="!visible.includes('热度')">
                        <template #default="scope">
                            <div style="width:100px">
                                <el-progress :show-text="false" :percentage="scope.row.pop" :color="'#c3c3c4'" />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-skeleton>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { watch, toRef } from 'vue'
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'
import { getMusicUrl, getSongLyric } from '@/request/request.js'
const store = usePlayList()
const { playing } = storeToRefs(store)
const { changePlaying, addToList, changeLyric, replacePlayList, changeUrlLoading } = store
const props = defineProps(['data', 'visible', 'allPlay','closeLoading'])
const emit = defineEmits(['allPlayed'])
// ref是拷贝 toRef是引用
const priviteData = toRef(props, 'data')
// 待修改 提到table内 props控制隐藏显示
watch(
    () => playing.value.id,
    (n, o) => {
        if (n != o) return
        priviteData.value.songs.forEach((d, idx) => {
            if (n == d.id) {
                d.collect = playing.value.collect
            }
        })
    },
    { deep: true }
)

watch(
    () => props.allPlay,
    (n, o) => {
        // 播放全部
        if (n) {
            onAllPlay()
        }
    }
)

const tableData = computed(() => {
    return priviteData.value.songs.map((song, idx) => {
        return {
            key: idx + 1,
            name: song.name,
            arname: song.ar ? song.ar[0].name : song.artists[0].name,
            al: song.al ? song.al.name : song.album.name,
            sq: song.sq,
            id: song.id,
            dt: durationTrans(song.dt || song.duration),
            originCoverType: song.originCoverType,
            pop: song.pop,
            fee: song.fee,
            collect: song.collect || false,
            replace: song.isList || false
        }
    })
})

const onAllPlay = async () => {
    changeUrlLoading(true)
    const list = tableData.value
    const url = await getMusicUrl(list[0].id)
    changeUrlLoading(false)
    const lyric = await getSongLyric(list[0].id)
    const musicUrl = url.data[0]
    const setSongInfo = { ...musicUrl, ...list[0] }
    changeLyric(lyric.lrc.lyric)
    changePlaying(setSongInfo)
    replacePlayList(priviteData.value.songs)
    // 全部播放之后 通知父组件更新播放状态为false 从而触发下一次watch按钮的全部播放状态
    emit('allPlayed')
}

// 播放音乐只需要音乐id 估做了修改
const onPlay = async (row) => {
    changeUrlLoading(true)
    // const res = await getMusicUrl(row.id)
   
    const lyric = await getSongLyric(row.id)
    // const data = res.data[0]
    const setSongInfo = {  ...row, ar: [{ name: row.arname }] }
    changeLyric(lyric.lrc.lyric)
    changePlaying(setSongInfo)
    // 如果是从歌单播放 则替换当前播放列表为歌单 否则添加单曲到播放列表
    if (row.replace) {
        replacePlayList(priviteData.value.songs)
    } else {
        addToList(setSongInfo)
    }
}

//原始逻辑
// const onPlay = async (row) => {
//     changeUrlLoading(true)
//     const res = await getMusicUrl(row.id)
//     changeUrlLoading(false)
//     const lyric = await getSongLyric(row.id)
//     const data = res.data[0]
//     const setSongInfo = { ...data, ...row, ar: [{ name: row.arname }] }
//     changeLyric(lyric.lrc.lyric)
//     changePlaying(setSongInfo)
//     // 如果是从歌单播放 则替换当前播放列表为歌单 否则添加单曲到播放列表
//     if (row.replace) {
//         replacePlayList(priviteData.value.songs)
//     } else {
//         addToList(setSongInfo)
//     }
// }

const highLight = ({ row }) => {
    if (row.id == playing.value.id) {
        return 'table_row_active'
    }
    return ''
}

const tdIndex = computed(() => {
    return (key) => key >= 10 ? key : '0' + key
})

function durationTrans(mss) {
    if (typeof mss !== 'number') return mss
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    seconds = seconds >= 10 ? seconds : '0' + seconds
    minutes = minutes >= 10 ? minutes : '0' + minutes
    return minutes + ":" + seconds;
}

const onCollect = (row) => {
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
.el-table :deep() .table_row_active td {
    background-color: #f5f7fa !important;
}

.el-table :deep() .table_row_active .song_name {
    color: #626aef !important;
}

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