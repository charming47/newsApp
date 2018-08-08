var app = getApp()

Page({
  data: {
    navbar: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    currentTab: 0,
  },
 
  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
})

