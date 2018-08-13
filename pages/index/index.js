var app = getApp()

Page({
  data: {
    navbar: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    currentTab: 0,
    imgUrls: [
      'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161219\/148211980641.png',
      'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161222\/148238831285.png',
      'http:\/\/mz.djmall.xmisp.cn\/files\/banner\/20161222\/14823895573.png'
    ],
    type: "gn",
    newsList: []
  },

  onLoad() {
    console.log('onLoad')
    this.getNews()
  },

  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  getNews() {
    console.log('getNews')
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        console.log(result.length)
        this.setNewsList(result)
      }
    })
  },

  setNewsList(result) {
    console.log('setNewsList')
    let newsList = []
    for(let i = 0; i < result.length; i++){
        newsList.push({
          title: result[i].title,
          source: (result[i].source === "") ? "快读原创" : result[i].source,
          date: (result[i].date).substring(11,16),
          imagePath: result[i].firstImage
        })
    }
    this.setData({
      newsList: newsList
    })
  }
})





