export const setLocalData = (name,data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

export const getLocalData = (name) => {
    return JSON.parse(localStorage.getItem(name)) || undefined
}

export const removeLocalData = (target) => {
    localStorage.removeItem(target)
}

export const getChineseNumber  = (number) => {
    const strNumber = number.toString() 
    let result = strNumber
    if(strNumber.length > 5){
        result = strNumber.slice(0,4) + '万'
    }
    if(strNumber.length > 8){
        result = strNumber.slice(0,1) + '亿'
    }
    return result
}

export const timestampToTime = (timestamp) => {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}