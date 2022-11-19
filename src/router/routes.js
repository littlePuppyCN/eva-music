import Find from '../views/find/FindMusic.vue'
import Radio from '../views/radio/Radio.vue'
import Search from '../views/search/Search.vue'
import Video from '../views/video/Video.vue'
const routes = [
    {
        path: '/',
        name: 'find',
        cname:'发现音乐',
        component: Find
    },
    {
        path: '/radio',
        name: 'radio',
        cname:'播客',
        component: Radio
    },
    {
        path: '/video',
        name: 'video',
        cname:'视频',
        component: Video
    },
    {
        path: '/sub',
        name: 'sub',
        cname:'关注',
        component: Video
    },
    {
        path: '/stream',
        name: 'stream',
        cname:'直播',
        component: Video
    },
    {
        path: '/fm',
        name: 'fm',
        cname:'私人FM',
        component: Video
    },
    {
        path:'/search',
        name:'search',
        component:Search
    }
]

export default routes