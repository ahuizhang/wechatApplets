import {
  setStorageUserInfo
} from "../../utils/storage"
Page({
  bindgetuserinfo(e) {
    // console.log(e)
    const {
      userInfo
    } = e.detail
    setStorageUserInfo(userInfo)
    wx.navigateBack({
      delta: 1
    });
  }
})