var app = getApp()
// 通过type来判断要渲染的新闻数据
const typesMap = {
  '0': 'gn',
  '1': 'gj',
  '2': 'cj',
  '3': 'yl',
  '4': 'js',
  '5': 'ty',
  '6': 'other'
}

Page({
  data: {
    navbar: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    currentTab: 0,
    type: "gn",
    newsList: [],
    headlineTitle: "",
    headlineSource: "",
    headlineTime: "",
    headlineImagePath: "",
    headlineId: 0,
    failImage: ""
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
  // 获取新闻
  getNews(callback) {
    console.log('getNews')
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setNewsList(result)
      },
      fail: err => {  //获取失败
        let failImage = "/images/404.png"
        this.setData({
          failImage: failImage
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  // 导航切换监听  
  navbarTap: function(e) {
    var currentTab = e.currentTarget.dataset.idx
    console.log(e)
    this.setData({
      currentTab: currentTab,
      type: typesMap[currentTab]
    })
    this.getNews()
  },


  // 设置渲染的新闻列表数据
  setNewsList(result) {
    console.log('setNewsList')
    let newsList = []
    for (let i = 1; i < result.length; i++) {
      let dateTemp = (result[i].date)
      newsList.push({
        title: result[i].title,
        source: (result[i].source === "") ? "快读原创" : result[i].source, //针对source为空的数据，默认为“快读原创”
        date: dateTemp.substring(5, 7) + "月" + dateTemp.substring(8, 10) + "日 " + dateTemp.substring(11, 16), //完善显示日期功能
        imagePath: (result[i].firstImage === "") ? "images/default.png" : result[i].firstImage,
        id: result[i].id
      })
    }

    let headlineTitle = result[0].title
    let headlineSource = (result[0].source === "") ? "快读原创" : result[0].source
    let headlineTime = (result[0].date).substring(11, 16)
    let headlineImagePath = (result[0].firstImage === "") ? "images/default.png" : result[0].firstImage  //完善无响应情况下以默认图片代替的功能
    let headlineId = result[0].id
    this.setData({
      newsList: newsList,
      headlineTitle: headlineTitle,
      headlineSource: headlineSource,
      headlineTime: headlineTime,
      headlineImagePath: headlineImagePath,
      headlineId: headlineId
    })
  },

  // 点击某条新闻，转入到新闻详情页，适用于头条下面的新闻列表
  onTapNewsContent: function(e) {
    console.log('onTapNewsContent')
    var index = e.currentTarget.dataset.idx
    var id = this.data.newsList[index].id
    wx.navigateTo({
      url: '/pages/content/content?id=' + id
    })

    console.log(id)
  },

  //点击头条新闻，转入到新闻详情页
  onTapHeadlineContent() {
    console.log('onTapHeadlineContent')
    wx.navigateTo({
      url: '/pages/content/content?id=' + this.data.headlineId
    })
  }
})