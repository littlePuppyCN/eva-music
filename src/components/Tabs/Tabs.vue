<template>
    <div class="navWrapper">
        <span  
        :style="{fontSize:props.fontSize}"
        :class="['nav', idx == props.currentTab ? 'navActive' : '']" v-for="(tab, idx) in props.tabs" :key="idx"
            @click="onClick(tab,idx)">
            {{ tab.name }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps(['fontSize','currentTab','tabs'])
const emit = defineEmits(['onTabClick'])
const onClick = (tab,idx) => {
    emit('onTabClick',tab,idx)
}

</script>

<style scoped>
.nav{
    color: #626060;
    margin-right: 20px;
}

.nav:hover{
    cursor: pointer;
    color: black;
}

.navActive{
    border-bottom: 2px solid #626aef;
    padding-bottom: 2px;
}
</style>