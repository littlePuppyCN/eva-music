<template>
    <div class="comment">
        <el-input resize="none"  show-word-limit maxlength="140" :autosize="{ minRows: 5, maxRows: 8 }" v-model="textarea"
            type="textarea" placeholder="" />
        <div class="option">
            <el-button @click="emit('onComment',textarea)" round>评论</el-button>
        </div>
        <div class="main">
            <h3>最新评论({{props.data.total}})</h3>
            <CommentBar v-for="(com,idx) in props.data.comments" :data="com" :key="idx" />
        </div>
    </div>
</template>

<script setup>
import CommentBar from '@/components/CommentBar/index.vue'
import { ref } from 'vue'
const emit = defineEmits(['onComment'])
const props = defineProps(['data'])
const textarea = ref('')
</script>

<style scoped>
h3{
    color: black;
}
.comment :deep() .el-button{
    margin-right: 0px;
}
.option{
    text-align: right;
    margin-top: 6px;
}
.comment {
    padding: 30px 30px 0 30px;
}
</style>