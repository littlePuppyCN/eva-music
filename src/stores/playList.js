import { ref } from 'vue'
import { defineStore } from 'pinia'
import { setLocalData } from '@/utils/utils.js'

export const usePlayList = defineStore('playList', () => {
  const playing = ref({})
  const playList = ref([])
  const playListVisible = ref(false)
  const lyric = ref('')

  function changePlaying(url) {
    playing.value = url
  }

  function changeVisible() {
    playListVisible.value = !playListVisible.value
  }

  function addToList(song) {
    const same = playList.value.some((s) => s.id == song.id)
    if (same) return
    playList.value.unshift(song)
    setLocalData('PLAY_LIST', playList.value)
  }

  function replacePlayList(newList) {
    playList.value = newList
    setLocalData('PLAY_LIST', newList)
  }

  function cleanPlayList () {
    playList.value = []
    setLocalData('PLAY_LIST',[])
  }

  function changeLyric (curLyric) {
    lyric.value = curLyric
  }

  return {
    playing,
    changePlaying,
    playListVisible,
    changeVisible,
    playList,
    addToList,
    replacePlayList,
    cleanPlayList,
    lyric,
    changeLyric
  }
})