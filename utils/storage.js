export const setStorageCates = (params) => {
    wx.setStorageSync('cates', params);
}
export const getStorageCates = () => {
    return wx.getStorageSync('cates');
}


export const setStorageCart = (params) => {
    wx.setStorageSync('cart', params)
}
export const getStorageCart = () => {
    return wx.getStorageSync('cart')
}


export const setStorageAddress = (params) => {
    wx.setStorageSync('address', params)
}
export const getStorageAddress = () => {
    return wx.getStorageSync('address')
}


export const setStorageToken = (params) => {
    wx.setStorageSync('token', params);
}
export const getStorageToken = () => {
    return wx.getStorageSync('token');
}


export const setStorageUserInfo = (params) => {
    wx.setStorageSync('userInfo', params);
}
export const getStorageUserInfo = () => {
    return wx.getStorageSync('userInfo');
}

export const setStorageCollect = (params) => {
    wx.setStorageSync('collect', params);
}
export const getStorageCollect = () => {
    return wx.getStorageSync('collect');
}