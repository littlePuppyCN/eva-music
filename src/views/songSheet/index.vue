<template>
    <section>
        <header>
            <el-skeleton style="width:440px;" :loading="info.songs && !Object.keys(info.songs).length > 0" animated>
                <template #default>
                    <div class="left">
                        <img v-if="isEmpty" :src="info.coverImgUrl" alt="">

                    </div>
                    <div class="info">
                        <h1><span class="scale" style="margin-right:8px;margin-left: 0px;">歌单</span>{{
                                info.name
                        }}
                        </h1>
                        <div class="actor">
                            <img v-if="isEmpty" :src="info.creator?.avatarUrl" alt="">
                            <span>{{ info.creator?.nickname }}</span>
                            <p>{{ timestampToTime(info.createTime) }}创建</p>
                        </div>
                        <div>
                            <el-button @click="onAllPlay" color="#626aef" type="primary" round :icon="Plus">播放全部
                            </el-button>
                            <el-button round :icon="Collection">收藏({{ getChineseNumber(info.subscribedCount
                                    || 0)
                            }})
                            </el-button>
                            <el-button round :icon="Share">分享{{ getChineseNumber(info.shareCount || 0) }}
                            </el-button>
                        </div>
                        <div>
                            标签:
                            <span style="color:#537eaf;">
                                {{ info.algTags?.join('/') }}
                            </span>
                        </div>
                        <div>
                            简介:{{ info.description }}
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </header>
        <div>
            <div class="tab">
                <TabsVue :currentTab="currentTab" :tabs="getTabs" @onTabClick="onTabClick" />
            </div>
            <MusicVue @allPlayed="allPlayed" :all-play="allPlay" v-if="currentTab == 0" :visible="[]" :data="newInfo" />
            <Comment @onComment="onComment" :data="props.comment" v-else />
        </div>
    </section>
</template>

<script setup>
import {
    Plus,
    Collection,
    Share
} from '@element-plus/icons-vue'
import { sendComment } from '@/request/request.js'
import { ref, toRef , watch } from 'vue'
import { timestampToTime, getChineseNumber } from '@/utils/utils.js'
import MusicVue from '../search/music.vue'
import TabsVue from '../../components/Tabs/Tabs.vue'
import Comment from './comment.vue'
import { computed } from '@vue/reactivity'

const props = defineProps(['id', 'comment', 'sheetInfo'])
const emit = defineEmits(['getComment'])
const currentTab = ref(0)
const info = toRef(props, 'sheetInfo')

watch(
    () => info.value,
    (n) => {
      console.log(n)
    },
    { deep: true }
)

const newInfo = computed(() => {
    const obj = info.value
    obj.songs = info.value.tracks?.map((s) => ({ ...s, isList: true }))
    return obj
})

const tabs = ref([
    { name: '歌曲列表', value: 'songs' },
    { name: `评论(0)`, value: 'comment' }
])

const getTabs = computed(() => {
    if (props.comment.total == undefined) return
    tabs.value[1].name = `评论(${props.comment.total})`
    return tabs.value
})

const allPlay = ref(false)

const isEmpty = computed(() => {
    return Object.keys(info.value).length > 0
})

const allPlayed = () => {
    allPlay.value = false
}

const onAllPlay = () => {
    allPlay.value = true
}

const onTabClick = (_, idx) => {
    currentTab.value = idx
}

const onComment = async (textarea) => {
    if (!textarea.length) return
    const param = {
        type: 'sheet',
        content: textarea,
        // id:route.params.id
        id: props.id
    }
    const res = await sendComment(param)
    setTimeout(() => {
        emit('getComment')
    }, 2000)
}

</script>

<style  scoped>
.tab {
    margin-bottom: 20px;
    padding-left: 30px;
}

.left {
    min-width: 200px;
    max-height: 200px;
    max-width: 200px;
}

.actor p {
    font-size: 12px;
}

.actor {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.actor span {
    font-size: 12px;
    color: #537eaf;
    margin: 0 8px;
}

.actor img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

h1 {
    font-weight: bold;
}

header div:nth-child(1) {
    margin-right: 20px;
}

header {
    width: 100%;
    display: flex;
    padding: 30px;
}

header div:nth-child(1) img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
</style>