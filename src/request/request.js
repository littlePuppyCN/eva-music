const baseUrl = 'http://localhost:3000'
const verUrl = 'https://netease-cloud-music-api-lilac-eight-42.vercel.app'
const realIP = '192.168.2.104'

export const getSearchList = (param) => {
    return fetch(`${baseUrl}/search?keywords=${param.keyword}&limit=100&type=${param.type || 1}&realIP=${realIP}`).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getMusicUrl = (id) => {
    return fetch(`${baseUrl}/song/url/v1?id=${id}&level=exhigh&realIP=${realIP}`).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getHot = (id) => {
    return fetch(`${baseUrl}/search/hot/detail`).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getBanner = (id) => {
    return fetch(`${baseUrl}/banner?type=0`).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getSongLyric = (id) => {
    return fetch(`${baseUrl}/lyric?id=${id}`).then(res=>res.json()).then(res => {
        return res
    })
} 