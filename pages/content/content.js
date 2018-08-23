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

  setContent(result) {
    console.log('setContent')
    let title = result.title
    let source = (result.source === "") ? "快读原创" : result.source
    let time = (result.date).substring(11, 16)
    let readCount = result.readCount
    let content = result.content
    let contentList = []
    for (let i = 0; i < content.length; i++) {
      if (content[i].type === ('p' || 'strong')) {
        contentList.push({
          text: content[i].text
        })
      }
      if (content[i].type === 'image') {
        contentList.push({
          image: content[i].src
        })
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