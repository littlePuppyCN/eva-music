const baseUrl = 'http://localhost:3000'

export const getSearchList = (param) => {
    return fetch(`${baseUrl}/search?keywords=${param.keyword}&limit=100&type=${param.type || 1}`).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getMusicUrl = (id) => {
    return fetch(`${baseUrl}/song/url/v1?id=${id}&level=exhigh`).then(res=>res.json()).then(res => {
        return res
    })
} 

export const getHot = (id) => {
    return fetch(`${baseUrl}/search/hot/detail`).then(res=>res.json()).then(res => {
        return res
    })
} 