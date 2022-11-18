<script setup>
import Home from './views/Home.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

window.onload = () => {
  const currentPath = router.currentRoute.value.path
  if(currentPath !== '/') {
    router.push('/')
  }
}

</script>

<template>
  <Home />
</template>

<style scoped>

</style>
