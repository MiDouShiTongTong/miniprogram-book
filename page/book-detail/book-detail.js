Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: {},
    bookCommentList: [],
    isBuyBook: false,
    downloadBoolFilePercent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始化书籍信息
    const bookInfo = JSON.parse(options.bookInfo)
    
    // 初始化书籍评论
    let bookCommentList = [];
    const allBookCommentList = wx.getStorageSync('bookCommentList');
    if (allBookCommentList) {
      const _bookCommentList = allBookCommentList[`book-${bookInfo.id}`];
      if (_bookCommentList) {
        bookCommentList = _bookCommentList;
      }
    };

    // 初始化书籍是否已经购买
    let isBuyBook = false;
    const buyBookList = wx.getStorageSync('buyBookList');
    if (buyBookList) {
      isBuyBook = buyBookList[`book-${bookInfo.id}`] ? true : false;
    }

    this.setData({
      bookInfo,
      bookCommentList,
      isBuyBook
    });
  },

 /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 初始化书籍评论
    let bookCommentList = [];
    const allBookCommentList = wx.getStorageSync('bookCommentList');
    if (allBookCommentList) {
      const _bookCommentList = allBookCommentList[`book-${this.data.bookInfo.id}`];
      if (_bookCommentList) {
        bookCommentList = _bookCommentList;
      }
    };
    this.setData({
      bookCommentList
    });
  },

  buyBook() {
    wx.showModal({
      title: '提示',
      content: '确定用1积分购买此书？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          this.doBuyBook();
        } else {
          // 取消购买
        }
      }
    })
  },

  doBuyBook() {
    // 请求服务端购买
    // ...

    wx.showToast({
      title: '兑换成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });

    // 标识用户已购买
    this.setData({
      isBuyBook: true
    });
    let buyBookList = wx.getStorageSync('buyBookList');
    if (buyBookList === '') {
      buyBookList = {};
    }
    buyBookList[`book-${this.data.bookInfo.id}`] = this.data.bookInfo;
    wx.setStorageSync('buyBookList', buyBookList);
  },

  readBook() {
    const bookFileUrl = 'https://yyccyy.com/wp-content/uploads/2018/12/compressed.tracemonkey-pldi-09.pdf';
    
    // 下载书籍
    const downloadBookFile = wx.downloadFile({
      url: bookFileUrl,
      success: (res) => {
        console.log('文档下载成功');
        // 隐藏下载进度条
        this.setData({
          downloadBoolFilePercent: 0
        });
        // 打开本地文档
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开本地文档成功')
          },
          fail: function (error) {
            console.log('打开本地文档失败')
            console.log(error);
          }
        });
      },
      fail: function (error) {
        console.log('文档下载失败')
        console.log(error);
      }
    });
    // 更新下载进度
    downloadBookFile.onProgressUpdate(res => {
      this.setData({
        downloadBoolFilePercent: res.progress
      });
    });
  },

  toBookComment() {
    // 将书籍信息拼接到 url 后面
    let bookDetailUrl = `/page/comment/comment?bookInfo=${JSON.stringify(this.data.bookInfo)}`;
    wx.navigateTo({
      url: bookDetailUrl
    });
  }
})