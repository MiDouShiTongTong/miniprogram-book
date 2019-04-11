Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取我的书籍列表
    let bookList = [];
    const buyBookList = wx.getStorageSync('buyBookList');
    if (buyBookList) {
      Object.keys(buyBookList).forEach(key => bookList.push(buyBookList[key]));
    }

    this.setData({
      bookList
    });
  },
  
  toBookDetail(e) {
    const bookInfo = e.currentTarget.dataset.bookInfo;
    wx.navigateTo({
      url: `/page/book-detail/book-detail?bookInfo=${JSON.stringify(bookInfo)}`
    })
  }
})