<script setup>
import Audio from '@/components/Audio/Audio.vue'
import { usePlayList } from '@/stores/playList'
import { storeToRefs } from 'pinia'

const store = usePlayList()
const { playing } = storeToRefs(store)
const { changePlaying } = store

const onCollect = () => {
    const isCollected = playing.value.collect
    changePlaying({ ...playing.value, collect: !isCollected })
}

</script>

<template>
    <div class="footer">
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
        <div>
            <Audio>
            </Audio>
        </div>
        <div>3</div>
    </div>
</template>


<style scoped>
.footer {
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 30px;
}
</style>