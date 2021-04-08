import {
  request
} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {
  wxLogin
} from "../../utils/asyncAwait"
import {setStorageToken} from "../../utils/storage"
Page({
  async bindgetuserinfo(e) {
    // console.log(e)
    const {
      encryptedData,
      rawData,
      iv,
      signature,
    } = e.detail
    const {
      code
    } = await wxLogin()
    const list = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    // console.log(list)
    const {token} = await request({
      url: 'users/wxlogin',
      method: "post",
      data: list
    })
    setStorageToken(token)
    wx.navigateBack({
      delta: 1
    });
  }
})