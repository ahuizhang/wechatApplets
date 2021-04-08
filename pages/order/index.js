/* 
1 onLoad 通过形参获取url上的参数
2 onShow 无法通过 形参获取url上的参数
 */


import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
import { getStorageToken } from "../../utils/storage.js";

Page({
  data: {
    tabs: [
      { id: 0, title: "全部", isActive: true },
      { id: 1, title: "待付款", isActive: false },
      { id: 2, title: "待发货", isActive: false },
      { id: 3, title: "退款/退货", isActive: false }
    ],
    orderList: []
  },
  // type:-1,
  // 子组件触发的事件
  handleItemChange(e) {
    // 获取传递过来的索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 重新发送请求
    let type=index+1;
    this.getOrderList(type);
  },
  // 根据索引器去修改标题
  changeTitleByIndex(index) {
    // 获取tabs数组
    let { tabs } = this.data;
    // 循环修改tabs数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs });
  },
  onLoad(options) {
    // this.type=options.type;
  },
  onShow() {
    // console.log(this.type);

    /* 
    1 在小程序中 存在页面栈(数组)概念  最多只能打开10个页面 
      越晚打开的页面索引越大 
    2 可以获取到页面数组
    3 就可以拿到最晚的打开的页面 == 当前页面 
    4 当获取到页面 对象！！ 有一个属性 options 
     */

    //  0 判断有没有token
    const token = getStorageToken();
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }


    let pageList = getCurrentPages();
    // 获取当前的页面对象
    let currentPage = pageList[pageList.length - 1];
    // 获取传递过来的type属性
    const { type } = currentPage.options;

    this.getOrderList(type);

    // 根据不同的type来显示不同的激活标题
    // 定义要激活标题的索引
    let index=type-1;
    this.changeTitleByIndex(index);
  },

  // 获取订单数组
  async getOrderList(type) {

    let header = {
      Authorization: getStorageToken()
    }
    let { orders } = await request({ url: "my/orders/all", data: { type }, header: header })
    // 修改时间格式
    orders.forEach(v => {
      v.create_time_cn = (new Date(v.create_time * 1000)).toLocaleString();
    })
    this.setData({
      orderList: orders
    });
  }
})