import c_fetch from "./fetch"
const curUrl = false
const verUrl = curUrl ? 'http://localhost:3000': 'https://node.lazylan.top'
const realIP = '192.168.2.104'

'https://netease-cloud-music-api-lilac-eight-42.vercel.app'

// 请求拦截
c_fetch.interceptors.request.use(function(config) {
    return config
})

// 响应拦截
c_fetch.interceptors.response.use((res) => {
    return res
})


export const getSearchList = (param) => {
    return c_fetch(`${verUrl}/search?keywords=${param.keyword}&limit=100&type=${param.type || 1}&realIP=${realIP}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getMusicUrl = (id) => {
    return c_fetch(`${verUrl}/song/url/v1?id=${id}&level=exhigh&realIP=${realIP}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getHot = (id) => {
    return c_fetch(`${verUrl}/search/hot/detail`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getBanner = (id) => {
    return c_fetch(`${verUrl}/banner?type=0`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getSongLyric = (id) => {
    return c_fetch(`${verUrl}/lyric?id=${id}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getRecommandSheet = (limit) => {
    return c_fetch(`${verUrl}/personalized?limit=${limit}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

export const getRecommandSongs = () => {
    return c_fetch(`${verUrl}/personalized/newsong?limit=15`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

export const getSongSheet = (id) => {
    return c_fetch(`${verUrl}/playlist/detail?id=${id}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}


export const getLikeList = (id) => {
    return c_fetch(`${verUrl}/likelist?uid=${id}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

export const getSheetComment = (id) => {
    return c_fetch(`${verUrl}/comment/playlist?id=${id}&timestamp=${Date.now()}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

export const sendComment = (param) => {
    const types = {
        song:0,
        mv:1,
        sheet:2,
        album:3,
        radio:4,
        video:5,
        zone:6
    }
    return c_fetch(`${verUrl}/comment?t=1&type=${types[param.type]}&id=${param.id}&content=${param.content}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

export const getPhoneCode = (phone) => {
    return c_fetch(`${verUrl}/captcha/sent?phone=${phone}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

export const login = (phone,captcha) => {
    return c_fetch(`${verUrl}/login/cellphone?phone=${phone}&captcha=${captcha}`, { credentials: 'include'}).then(res=>res.json()).then(res => {
        return res
    })
}

// 歌曲详情
export const getSong = (ids) => {
    return c_fetch(`${verUrl}/song/detail?ids=${ids}&timestamp=${Date.now()}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}

// 喜欢歌曲
export const likeSong = (id,like) => {
    return c_fetch(`${verUrl}/like?id=${id}&like=${like}&timestamp=${Date.now()}`, { credentials: 'include' }).then(res=>res.json()).then(res => {
        return res
    })
}