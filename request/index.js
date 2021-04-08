let ajaxTime = 0
export const request = (params) => {
    ajaxTime++;
    wx.showLoading({
        title: '加载中',
    })
    const baseURL = "https://api.zbztb.cn/api/public/v1/"
    return new Promise((resolve, rejact) => {
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                rejact(err)
            },
            complete: () => {
                ajaxTime--;
                if (ajaxTime === 0) {
                    wx.hideLoading()
                }
            }
        });
    })
}