<template>
    <div class="loading" v-if="loading">
         载入中...
    </div>
    <slot v-else />
</template>

<script setup>
const props = defineProps(['loading'])
</script>

<style scoped>
.loading{
    text-align: center;
    font-size: 14px;
}
</style>