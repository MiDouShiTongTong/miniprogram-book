App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    this.checkSignStatus();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  checkSignStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      // 用户未登录，去登陆
      this.signIn();
    }
  },
  signIn() {
    wx.login({
      success(res) {
        // 获取 code
        const code = res.code;
        console.log(code);
        
        // 利用 code 从服务端获取用户信息
        // ...

        // 保存用户信息
        wx.setStorageSync('userInfo', {});
      }
    });
  }
})