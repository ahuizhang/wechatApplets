import regeneratorRuntime from '../../lib/runtime/runtime';
import {
    request
} from "../../request/index.js";
Page({
    data: {
        goods: []
    },
    isTime : -1,
    handeSearchInput(e) {
        // console.log(e)
        const {
            value
        } = e.detail
        if (!value.trim()) {
            return
        } else {
            clearTimeout(this.isTime)
            this.isTime = setTimeout(() => {
                this.getQSearch(value)
            }, 1000);
        }
    },
    async getQSearch(query) {
        const goods = await request({
            url: "goods/qsearch",
            data: {
                query
            }
        })
        this.setData({
            goods
        });
    }
})