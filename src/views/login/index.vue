<template>
    <div class="login" v-if="loginVisible" :style="initPos">
        <div class="close">
            <span @click="close">X</span>
        </div>
        <div class="logo"></div>
        <div class="input">
            <el-input size="large" @focus="onFoucs" v-model="phone" class="w-50 m-2" placeholder="请输入手机号"
                :prefix-icon="Phone" />
            <el-input style="margin-top:8px;" size="large" v-model="code" :prefix-icon="Key">
                <template #append>
                    <span :class="{ 'unable': btnDisable }" @click="getCode" class="get">
                        <span v-if="!btnDisable">获取验证码</span>
                        <span v-if="btnDisable">00 : <span v-if="(time < 10)">0</span>{{ time }}</span>
                    </span>

                </template>
            </el-input>
            <p :style="{ opacity: showRule ? 1 : 0 }">请输入十一位数字</p>
            <el-button @click="onLogin" size="large" style="width:100%;margin-top: 50px;" type="primary"
                color="#626aef">
                登录
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { useLogin } from '@/stores/login'
import { storeToRefs } from 'pinia'
import { Phone, Key } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { getPhoneCode, login } from '@/request/request.js'
import { setLocalData } from '@/utils/utils.js'
import { ElMessage } from 'element-plus'
const store = useLogin()
const { loginVisible, } = storeToRefs(store)
const { changeVisible, changeUserInfo, changeCookie, handleLogin } = store

const phone = ref('')
const code = ref('')
const showRule = ref(false)
const btnDisable = ref(false)
const time = ref(60)
const myTimer = ref(null)
const initPos = ref({
    top: '50%',
    left: '50%'
})
const isDragging = ref(false)

watch(
    () => time.value,
    (n) => {
        if (n === 0) {
            clearInterval(myTimer.value)
            btnDisable.value = false
            time.value = 60
        }
    }
)

const close = () => {
    changeVisible(false)
}

const isPhoneNum = (num) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(num)
}

const onFoucs = () => {
    showRule.value = false
}

const timer = () => {
    myTimer.value = setInterval(() => {
        time.value -= 1
    }, 1000)
}


const getCode = async () => {
    if (isPhoneNum(phone.value)) {
        btnDisable.value = true
        timer()
        const res = await getPhoneCode(phone.value)
        if (res.code === 400) {
            console.log('123')
            ElMessage({
                showClose: true,
                message: '当天发送验证码的条数超过限制',
                type: 'error',
            })
        }
    } else {
        showRule.value = true
    }
}

const onLogin = async () => {
    if (isPhoneNum(phone.value)) {
        const res = await login(phone.value, code.value).catch((err) => console.log(err))
        console.log(res)
        if (res.code === 200) {
            const userInfo = { account: res.account, profile: res.profile }
            handleLogin(userInfo, res.cookie)

            ElMessage({
                message: '登录成功！',
                type: 'success',
            })
        }else{
            ElMessage({
                message: res.message,
                type: 'error',
            })
        }

    } else {
        showRule.value = true
    }
}

</script>

<style scoped>
.unable {
    color: rgb(188, 186, 186);
}

.get {
    cursor: pointer;
}

.input {
    width: 260px;
    margin: 0 auto;
}

.logo {
    width: 180px;
    height: 155px;
    margin: 20px auto 55px;
    background-image: url('@/assets/mylogo.png');
    background-repeat: no-repeat;
    background-size: 100%;
}

.close span {
    margin-right: 10px;
    cursor: pointer;
}

.close {
    font-size: 20px;
    text-align: right;
}

.login {
    position: fixed;
    width: 350px;
    height: 530px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f9feff;
    z-index: 999;
    box-shadow: 0px 0px 30px -5px rgb(0 0 0 / 30%);
}
</style>