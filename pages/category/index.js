import {
  request
} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {setStorageCates,getStorageCates} from "../../utils/storage"
Page({
  data: {
    leftList: [],
    rightList: [],
    currenIndex: 0,
    resetTop: 0
  },
  listData: [],
  async getCategories() {
    const res = await request({
      url: "categories"
    })
    this.listData = res
    // console.log(res)
    // wx.setStorageSync("cates", {
    //   time: Date.now(),
    //   data: this.listData
    // });
    setStorageCates({time:Date.now(),data:this.listData})
    const leftList = this.listData.map((v) => ({
      cat_id: v.cat_id,
      cat_name: v.cat_name
    }))
    const rightList = this.listData[0].children
    this.setData({
      leftList,
      rightList
    })
  },
  clickTap(e) {
    // console.log(e)
    const {
      index
    } = e.currentTarget.dataset
    const rightList = this.listData[index].children
    this.setData({
      currenIndex: index,
      rightList,
      resetTop: 0
    })
  },
  onLoad: function () {
    // const cates = wx.getStorageSync("cates");
    const cates=getStorageCates()
    if (!cates) {
      this.getCategories()
    } else {
      if (cates.time - Date.now() > 10000) {
        this.getCategories()
      } else {
        this.listData = cates.data
        const leftList = this.listData.map((v) => ({
          cat_id: v.cat_id,
          cat_name: v.cat_name
        }))
        const rightList = this.listData[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }

  },
})