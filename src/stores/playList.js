import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayList = defineStore('playList', () => {
    const playing = ref({})
    const playList = ref([])
    const playListVisible = ref(false)

    function changePlaying (url) {
      playing.value = url
    }

    function changeVisible () {
      playListVisible.value = !playListVisible.value
    }
  
    return { playing , changePlaying , playListVisible , changeVisible}
})