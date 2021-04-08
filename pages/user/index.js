import {
  getStorageUserInfo,
  getStorageCollect
} from "../../utils/storage"

Page({
  data: {
    userinfo: {},
    // 收藏的商品的数量
    collectLegnth: 0
  },
  onShow() {
    const userinfo = getStorageUserInfo()
    if (!userinfo) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    }
    const collect = getStorageCollect() || [];
    this.setData({
      userinfo,
      collectLegnth: collect.length
    })
  }
})