import {
  request
} from "../../request/index"
//Page Object
Page({
  data: {
    swiperdata: [],
    catitems: [],
    floordata:[]
  },
  gteSwiperdata() {
    request({
        url: "home/swiperdata"
      })
      .then(res => {
        // console.log(res)
        this.setData({
          swiperdata: res
        })
      })
  },
  getCatitems() {
    request({
        url: "home/catitems",
      })
      .then(res => {
        // console.log(res)
        this.setData({
          catitems: res
        })
      })
  },
  getFloordata(){
    request({
      url:"home/floordata"
    })
    .then(res=>{
      // console.log(res)
      this.setData({
        floordata:res
      })
    })
  },
  onLoad: function () {
    this.gteSwiperdata()
    this.getCatitems()
    this.getFloordata()
  },
});