import {
  request
} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    tabNav: [{
        id: 0,
        name: "综合",
        isActive: true
      },
      {
        id: 1,
        name: "销量",
        isActive: false
      },
      {
        id: 2,
        name: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  GoodsSearch: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  maxPageIndex: 1,
  async getGoodsSearch() {
    const res = await request({
      url: "goods/search",
      data: this.GoodsSearch
    })
    this.maxPageIndex = Math.ceil(res.total / this.GoodsSearch.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },
  handleChangeIndex(e) {
    // console.log(e)
    const {
      index
    } = e.detail
    const {
      tabNav
    } = this.data
    tabNav.forEach((e, i) => i === index ? e.isActive = true : e.isActive = false)
    this.setData({
      tabNav
    })
  },
  onLoad(options) {
    this.GoodsSearch.cid = options.cid
    this.getGoodsSearch()
  },
  onPullDownRefresh() {
    this.GoodsSearch.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsSearch()
  },
  onReachBottom() {
    if (this.GoodsSearch.pagenum >= this.maxPageIndex) {
      wx.showToast({
        title: '没有下一页',
        icon: 'none',
      });
    } else {
      this.GoodsSearch.pagenum++
      this.getGoodsSearch()
    }
  },
})