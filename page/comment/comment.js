Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    commentContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化书籍信息
    let bookInfo = {};
    bookInfo = JSON.parse(options.bookInfo)
   
    this.setData({
      bookInfo
    });
  },
  
  changeCommentContent(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },

  submitCommentForm () {
    if (this.data.commentContent === '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 1500,
        mask: false
      });

      return;
    }

    // 保存评论内容到本地存储中
    // 获取所有书籍评论
    let bookCommentList = wx.getStorageSync('bookCommentList');
    if (bookCommentList === '') {
      bookCommentList = {};
    }
    // 获取当前书籍评论
    const key = `book-${this.data.bookInfo.id}`;
    let currentBookCommentList = bookCommentList[key];
    if (currentBookCommentList === undefined) {
      currentBookCommentList = [];
    }
    // 添加新的评论
    const date = new Date();
    currentBookCommentList.unshift({
      content: this.data.commentContent,
      createdAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    });
    bookCommentList[key] = currentBookCommentList;
    // 保存评论数据
    wx.setStorageSync('bookCommentList', bookCommentList);
    // 跳转
    wx.navigateBack({
      delta: 1
    });
  }
})