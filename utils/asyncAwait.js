export const getSetting = () => {
    return new Promise((resolve, rejact) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });
    })
}
export const openSetting = () => {
    return new Promise((resolve, rejact) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });
    })
}
export const chooseAddress = () => {
    return new Promise((resolve, rejact) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });
    })
}

export const showModal = ({
    content
}) => {
    return new Promise((resolve, rejact) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });

    })
}
export const showToast = ({
    title
}) => {
    return new Promise((resolve, rejact) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });

    })
}
export const wxLogin = () => {
    return new Promise((resolve, rejact) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });
    })
}
export const requestPayment = (pay) => {
    return new Promise((resolve, rejact) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {}
        });

    })
}