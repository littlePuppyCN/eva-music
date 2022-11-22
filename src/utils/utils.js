export const setLocalData = (name,data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

export const getLocalData = (name) => {
    return JSON.parse(localStorage.getItem(name)) || undefined
}
