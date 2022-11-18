import Find from '../views/find/FindMusic.vue'
import Radio from '../views/radio/Radio.vue'
import Search from '../views/search/Search.vue'
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
        path:'/search',
        name:'search',
        component:Search
    }
]

export default routes