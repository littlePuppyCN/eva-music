import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayList = defineStore('playList', () => {
    const playing = ref({})
  
    function changePlaying (url) {
      playing.value = url
    }
  
    return { playing , changePlaying}
})