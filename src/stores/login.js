import { ref } from 'vue'
import { defineStore } from 'pinia'
import { setLocalData, removeLocalData } from '@/utils/utils.js'

export const useLogin = defineStore('login', () => {
    const loginVisible = ref(false)
    const userInfo = ref({})
    const cookie = ref('')

    function changeVisible(v) {
        loginVisible.value = v
    }
    function changeUserInfo(info) {
        userInfo.value = info
    }
    function changeCookie(co) {
        cookie.value = co
    }

    function handleLogin(uInfo, cookie) {
        setLocalData('COOKIE', cookie)
        setLocalData('USER', uInfo)
        changeUserInfo(uInfo)
        changeCookie(cookie)
        changeVisible(false)
    }

    function handleLogout() {
        changeUserInfo({})
        changeCookie("")
        removeLocalData('COOKIE')
        removeLocalData('USER')
    }


    return {
        loginVisible,
        changeVisible,
        changeUserInfo,
        userInfo,
        changeCookie,
        cookie,
        handleLogin,
        handleLogout
    }
}) 