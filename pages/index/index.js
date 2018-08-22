var app = getApp()

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

  getNews(callback) {
    console.log('getNews')
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        //currentTab: this.data.currentTab, //发现了吗，bindtap的currentTap数据并不作用于整个页面
        type: this.data.type   //.typesMap[0]
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setNewsList(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  // 导航切换监听  还是无法点tab时自动刷新
  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.idx
    console.log(e)
    this.setData({
      currentTab: currentTab,
      type: typesMap[currentTab]
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
  },

  onTapNewsContent(){
    wx.navigateTo({
      url: '/pages/content/content?=' + this.data.id,
    })
  }
})





