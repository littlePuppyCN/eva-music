<script setup>
import Audio from '@/components/Audio/Audio.vue'
import SongVue from '../../views/song/Song.vue';
import { useMenuStore } from '@/stores/global'
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'

const store = usePlayList()
const storeGlobal = useMenuStore()
const { playing } = storeToRefs(store)
const { songPageVisible } = storeToRefs(storeGlobal)
const { changePlaying, changeVisible } = store
const { changeSongVisible } = storeGlobal

const onPlayListVisible = () => {
    changeVisible()
}

const onCollect = () => {
    const isCollected = playing.value.collect
    changePlaying({ ...playing.value, collect: !isCollected })
}

const onSongVisible = async () => {
    changeSongVisible()
}

</script>

<template>
    <div style="height:100%;">
        <SongVue :visible="songPageVisible" />
        <div class="footer" style="z-index: 98;background: white;">
            <div style="display:flex;align-items:center;margin-left:20px;">
                <div style="margin-right:20px;">
                    <span @click="onSongVisible">
                        <el-icon size="18">
                            <ArrowUpBold />
                        </el-icon>
                    </span>
                </div>
                <div>
                    <div style="display:flex;align-items:center;">
                        <span style="font-size:18px;margin-right: 4px;">
                            {{ playing.name }}
                        </span>
                        <el-icon v-if="playing.collect != undefined" @click="onCollect" size="18">
                            <Star color="red" v-if="playing.collect" />
                            <Star v-else />
                        </el-icon>
                    </div>
                    <span>{{ playing.arname }}</span>
                </div>
            </div>
            <div>
                <Audio>
                </Audio>
            </div>
            <div @click="onPlayListVisible" style="margin-right:30px;">
                <el-icon size="20">
                    <Operation />
                </el-icon>
            </div>
        </div>

    </div>
</template>


<style scoped>
.footer {
    border-top: 1px solid #e0e0e0;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 20px 0 30px; */
}
</style>