// pages/content/content.js
Page({
  data: {
    id: 1523074607642,
    title: '',
    source: '',
    time: '',
    readCount: '',
    content: '',
    contentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad')
    this.setData({
      id: options.id
    })
    this.getContent()
  },

  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.getContent(() => {
      wx.stopPullDownRefresh()
    })
  },

  getContent() {
    console.log('getContent')
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        console.log(result.content)
        this.setContent(result)
      }
    })
  },

//设置新闻详情内容
  setContent(result) {
    console.log('setContent')
    let title = result.title
    let source = (result.source === "") ? "快读原创" : result.source
    let time = (result.date).substring(11, 16)
    let readCount = result.readCount
    let content = result.content
    let contentList = []
    for (let i = 0; i < content.length; i++) {  //根据api所给的信息，较好地设置新闻详情内容的布局，但由于api里面的content并不统一，图片后的一段文字应该是对图片的说明，然而有些新闻是这样，但另外的并不是，这点仍未解决
      if (content[i].type === 'p') { 
        contentList.push({
          text: content[i].text
        })
      }
      if (content[i].type === 'strong') {
        contentList.push({
          textStrong: content[i].text
        })
      }
      if (content[i].type === 'image') {
        contentList.push({
          image: content[i].src
        })
        if (i < content.length - 1) {
          i++;
          contentList.push({
            remark: content[i].text
          })
        }

      }
    }
    this.setData({
      title: title,
      source: source,
      time: time,
      readCount: readCount,
      content: content,
      contentList: contentList
    })
  }
})