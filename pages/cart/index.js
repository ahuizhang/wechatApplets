import regeneratorRuntime from "../../lib/runtime/runtime"
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncAwait"
import {
  setStorageAddress,
  getStorageAddress,
  setStorageCart,
  getStorageCart
} from "../../utils/storage"
Page({
  data: {
    address: {},
    cart: {},
    allNum: 0,
    allPrice: 0,
    allChecked: true,
    hasGoods: true
  },
  async handleAddress() {
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting["scope.address"]
    if (scopeAddress === true || scopeAddress === undefined) {

    } else {
      await openSetting()
    }
    const res2 = await chooseAddress()
    // 地址存储本地
    res2.all = res2.provinceName + res2.cityName + res2.countyName + res2.detailInfo
    setStorageAddress(res2)
  },
  onShow() {
    this.setData({
      address: getStorageAddress(),
      cart: getStorageCart()
    })
    this.getCalculate(this.data.cart)
  },
  getCalculate(cart) {
    let checkedArr = Object.values(cart)
    // let allChecked = checkedArr.ever(v => v.checked === true)
    let allChecked = true
    let allNum = 0
    let allPrice = 0
    checkedArr.forEach((e) => {
      if (e.checked) {
        allNum += e.num
        allPrice += e.goods_price * e.num
      } else {
        allChecked = false
      }
    })
    allChecked = checkedArr.length ? true : false
    const hasGoods = checkedArr.length ? true : false
    this.setData({
      allNum,
      allPrice,
      allChecked,
      cart,
      hasGoods
    })
    setStorageCart(cart)
  },
  checkboxChange(e) {
    // console.log(e)
    let {
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    cart[id].checked = !cart[id].checked
    this.getCalculate(cart)
  },
  allCheckboxChange() {
    let {
      allChecked,
      cart
    } = this.data
    allChecked = !allChecked
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = allChecked
      }
    }
    this.getCalculate(cart)
  },
  async handleSymbol(e) {
    // console.log(e)
    let {
      operation,
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    if (cart[id].num === 1 && operation === -1) {
      const res = await showModal({
        content: '确定删除？'
      })
      if (res.confirm) {
        delete cart[id]
        this.getCalculate(cart)
      }
    } else {
      cart[id].num += operation
      this.getCalculate(cart)
    }
  },
  async payTap() {
    const {
      address,
      allNum
    } = this.data
    if(!address.all){
      await showToast({title:'没有添加地址'})
    }else if(allNum<=0){
      await showToast({title:'没有添加商品'})
    }else{
    wx.navigateTo({
      url: '/pages/pay/index',
    });
    }
  }
})