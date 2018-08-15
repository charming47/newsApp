var app = getApp()

Page({
  data: {
    navbar: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    currentTab: 0,
    type: "gn",
    newsList: [],
    headlineTitle:"",
    headlineSource:"",
    headlineTime:"",
    headlineImagePath:""
  },

  onLoad() {
    console.log('onLoad')
    this.getNews()
  },

  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 导航切换监听
  navbarTap: function (e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  getNews(callback) {
    console.log('getNews')
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {
        let result = res.data.result
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNewsList(result) {
    console.log('setNewsList')
    let newsList = []
    for(let i = 1; i < result.length; i++){
        newsList.push({
          title: result[i].title,
          source: (result[i].source === "") ? "快读原创" : result[i].source,   //针对source为空的数据，默认为“快读原创”
          date: (result[i].date).substring(11,16),
          imagePath: result[i].firstImage
        })
    }
    let headlineTitle=result[0].title
    let headlineSource = (result[0].source === "") ? "快读原创" : result[0].source
    let headlineTime=(result[0].date).substring(11,16)
    let headlineImagePath=result[0].firstImage
    this.setData({
      newsList: newsList,
      headlineTitle: headlineTitle,
      headlineSource: headlineSource,
      headlineTime: headlineTime,
      headlineImagePath: headlineImagePath
    })
  }
})





