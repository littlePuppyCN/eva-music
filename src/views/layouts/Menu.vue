<script setup>
import routes from '@/router/routes.js'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity';
import { useMenuStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
const store = useMenuStore()
const { activeMenuIndex } = storeToRefs(store)
const { changeActive } = store
const router = useRouter()

const handleRoutesClick = (routeInfo, index) => {
    changeActive(routeInfo.path)
    router.push(routeInfo.path)
}

const getRealMenu = computed(() => {
    return routes.filter((r) => r.cname)
})

</script>

<template>
    <div class="menu_container">
        <div v-for="(route, idx) in getRealMenu" @click="handleRoutesClick(route, idx)" :key="idx"
            :class="['static', route.path == activeMenuIndex ? 'active' : '']">
            {{ route.cname }}
        </div>
    </div>
</template>



<style scoped>
.menu_container {
    width: 200px;
    border-right: 1px solid #e0e0e0;
    height: 100%;
    padding: 15px 2px 15px 15px;
}

.active {
    background-color: #f6f6f7;
    font-size: 18px;
    font-weight: bold;
}

.static {
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    text-indent: 8px;
    margin-bottom: 2px;
    cursor: pointer;
}

.static:hover {
    background-color: #f6f6f7;
}
</style>