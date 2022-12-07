<script setup>
import Home from './views/Home.vue'
import { useLogin } from '@/stores/login'
import { onMounted } from 'vue'
import { getLocalData } from '@/utils/utils.js'

const store = useLogin()
const { changeCookie , changeUserInfo} = store


onMounted(() => {
  const cok = getLocalData('COOKIE')
  const uInfo = getLocalData('USER')
  if(cok?.length){
    changeCookie(cok)
  }
  if(Object.keys(uInfo || {}).length > 0){
    changeUserInfo(uInfo)
  }
})

</script>

<template>
  <Home />
</template>

<style scoped>

</style>
