import {
  request
} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {
  setStorageCart,
  getStorageCart,
  getStorageCollect,
  setStorageCollect
} from "../../utils/storage"
Page({
  data: {
    goodsDetail: {},
    isCollect: false
  },
  setgoodsData: {},
  onLoad(options) {
    this.getGoodsDetail(options.goods_id)
  },
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: 'goods/detail',
      data: {
        goods_id
      }
    })
    this.setgoodsData = res
    // console.log(res)
    const collect = getStorageCollect() || []
    const isCollect = collect.some(v => v.goods_id === this.setgoodsData.goods_id)
    this.setData({
      goodsDetail: {
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        pics: res.pics,
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })
  },
  handleZoom(e) {
    console.log(e)
    const {
      index
    } = e.currentTarget.dataset
    const urls = this.data.goodsDetail.pics.map(v => v.pics_big)
    const current = urls[index]
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd() {
    let cart = getStorageCart() || {}
    if (cart[this.setgoodsData.goods_id]) {
      cart[this.setgoodsData.goods_id].num++;
    } else {
      cart[this.setgoodsData.goods_id] = this.setgoodsData
      cart[this.setgoodsData.goods_id].num = 1;
      cart[this.setgoodsData.goods_id].checked = true
    }
    setStorageCart(cart)
    wx.showToast({
      title: '加入购物车',
      icon: 'success',
      mask: true,
    });
  },
  collectTap() {
    const collect = getStorageCollect() || []
    const index = collect.findIndex(v => v.goods_id === this.setgoodsData.goods_id)
    if (index === -1) {
      collect.push(this.setgoodsData)
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
      this.setData({
        isCollect: true
      })
    } else {
      collect.splice(index, 1)
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true,
      });
      this.setData({
        isCollect: false
      })
    }
    setStorageCollect(collect)
  }
})