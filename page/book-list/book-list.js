Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [{
        id: '1',
        bookCategory: '分类1',
        name: 'NodeJS入门到放弃',
        author: '张三',
        publisher: '王五出版社',
        imageUrl: 'https://image.shutterstock.com/image-photo/book-260nw-732217162.jpg'
      },
      {
        id: '2',
        bookCategory: '分类2',
        name: 'JavaScript入门到放弃',
        author: '李四',
        publisher: '王五出版社',
        imageUrl: 'https://image.shutterstock.com/image-photo/mockup-opened-blank-square-ctalogue-260nw-518861248.jpg'
      },
      {
        id: '3',
        bookCategory: '分类3',
        name: 'TypeScript入门到放弃',
        author: '王五',
        publisher: '王五出版社',
        imageUrl: 'https://cdn.pixabay.com/photo/2016/03/09/09/14/books-1245690__340.jpg'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '书籍小程序',
      path: '/page/book-list/book-list',
      imageUrl: '/assets/images/logo.jpg',
      success() {
        console.log('转发成功');
      },
      fail() {
        console.log('转发失败');
      }
    };
  },

  toBookDetail(e) {
    // // 将书籍信息拼接到 url 后面
    let bookDetailUrl = `/page/book-detail/book-detail?bookInfo=${JSON.stringify(e.currentTarget.dataset.bookInfo)}`;
    wx.navigateTo({
      url: bookDetailUrl
    });
  }
})