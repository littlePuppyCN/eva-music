import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useMenuStore = defineStore('global', () => {
  const activeMenuIndex = ref('/')
  function changeActive(newIndex) {
    activeMenuIndex.value = newIndex
  }

  return { activeMenuIndex, changeActive }
})

export const globalClick = (fn) => {

  const whitelist = ['search','drop']

  document.getElementById('main').onclick = (evt) => {
    if(whitelist.includes(evt.target.id)) return 
    fn()
  }
}