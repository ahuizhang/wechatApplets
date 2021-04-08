import regeneratorRuntime from "../../lib/runtime/runtime"
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
  requestPayment
} from "../../utils/asyncAwait"
import {
  setStorageAddress,
  getStorageAddress,
  setStorageCart,
  getStorageCart,
  getStorageToken
} from "../../utils/storage"
import {
  request
} from "../../request/index"
Page({
  data: {
    address: {},
    cart: {},
    allPay: 0,
    allNum: 0
  },
  onShow() {
    const address = getStorageAddress()
    const cart = getStorageCart()
    const cartArr = Object.values(cart)
    let allPay = 0
    let allNum = 0
    cartArr.forEach(v => {
      if (v.checked) {
        allPay += v.num * v.goods_price
        allNum += v.num
      }
    })
    this.setData({
      address,
      cart,
      allPay,
      allNum
    })
  },
  async allPayTap() {
    try {
      const cart = this.data.cart
      const token = getStorageToken()
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        });
      } else {
        let header = {
          Authorization: token
        }
        let order_price = this.data.allPay
        let consignee_addr = this.data.address.all
        let goods = []
        for (const key in cart) {
          if (cart.hasOwnProperty(key)) {
            if (cart[key].checked) {
              goods.push({
                goods_id: cart[key].goods_id,
                goods_number: cart[key].num,
                goods_price: cart[key].goods_price
              })
            }
          }
        }
        const list = {
          order_price,
          consignee_addr,
          goods
        }
        const {
          order_number
        } = await request({
          header: header,
          url: 'my/orders/create',
          method: "post",
          data: list
        })
        // console.log(res)
        const {
          pay
        } = await request({
          header: header,
          url: 'my/orders/req_unifiedorder',
          method: 'post',
          data: {
            order_number
          }
        })
        // console.log(res)
        await requestPayment(pay)
        await request({
          header: header,
          url: 'my/orders/chkOrder',
          method: 'post',
          data: {
            order_number
          }
        })
        await showToast({
          title: '支付成功'
        })
        wx.navigateTo({
          url: '/pages/order/index',
        });
      }
    } catch (error) {
      console.log(error)
      await showToast({
        title: '支付失败'
      })
    }
  }
})