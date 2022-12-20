<template>
    <el-dialog top="30vh" @click.stop :modal="false" :model-value="props.visible" :title="props.title" :width="props.width"
        :before-close="beforeClose">
        <slot />
        <div style="text-align:center;margin-top: 30px;">
            <el-button @click="onDialogConfirm" color="#626aef" round>
                确定
            </el-button>
        </div>
    </el-dialog>
</template>

<script setup>
const props = defineProps(['visible', 'title', 'width'])
const emit = defineEmits(['beforeClose', 'onDialogConfirm'])

const beforeClose = () => {
    emit('beforeClose')
}

const onDialogConfirm = () => {
    emit('onDialogConfirm')
}

</script>

<style >

</style>