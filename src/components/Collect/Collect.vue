<template>
    <div>
        <el-icon size="16" class="collect" @click="onClick" v-loading="loading">
            <Star color="red" v-if="props.collected" />
            <Star v-else />
        </el-icon>
        <DialogVue :visible="visible" :width="500" @beforeClose="visible = false" @onDialogConfirm="onDialogConfirm">
            <div style="text-align:center;">确定将选中歌曲从我喜欢的音乐中删除?</div>
        </DialogVue>
    </div>

</template>

<script setup>
import { likeSong } from '@/request/request.js'
import { ref, watch } from 'vue'
import DialogVue from '../Dialog/Dialog.vue';
const props = defineProps(['collected', 'songID'])
const emit = defineEmits(['onCollect'])
const loading = ref(false)
const visible = ref(false)

const onDialogConfirm = async () => {
    const res = await likeSong(props.songID, false)
    if (res.code === 200) {
        visible.value = false
        emit('onCollect')
    }
}

const onClick = async () => {
    if (props.songID) {
        if (!props.collected === false) {
            visible.value = true
            return
        }
        loading.value = true
        const res = await likeSong(props.songID, !props.collected)
        if (res.code === 200) {
            loading.value = false
            emit('onCollect')
        }
    }
}
</script>

<style scoped>
.collect:hover {
    cursor: pointer;
    color: red;
}
</style>