Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSignIn: wx.getStorageSync('userInfo') ? true : false
  },
  
  toUserBook() {
    wx.navigateTo({
      url: '/page/user-book/user-book'
    })
  }
})