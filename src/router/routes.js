import Find from '../views/find/FindMusic.vue'
import Radio from '../views/radio/Radio.vue'
import Search from '../views/search/Search.vue'
import Video from '../views/video/Video.vue'
import Recommend from '../views/recommend/index.vue'
import SongSheet from '../views/songSheet/sheet.vue'
import iLike from '@/views/iLike/index.vue'
import Login from '@/views/login/index.vue'
import Xiao from '@/views/Xiao.vue'
const routes = [
    // {
    //     path: '/',
    //     component: Xiao
    // },
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
    },
    {
        path:'/recommend',
        name:'recommend',
        component:Recommend
    },
    {
        path:'/songsheet/:id',
        name:'songsheet',
        component:SongSheet
    },
    {
        path:'/iLike',
        name:'iLike',
        cname:'我喜欢的音乐',
        personal:true,
        component:iLike,
        meta:{
            auth:true
        }
    },
    {
        path:'/download',
        name:'download',
        cname:'本地与下载',
        personal:true,
    },
    {
        path:'/recent',
        name:'recent',
        cname:'最近播放',
        personal:true,
    },
    {
        path:'/login',
        component:Login
    }
]

export default routes