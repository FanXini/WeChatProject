// pages/factoryMonitor/factoryMonitor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    var that = this
    wx.request({
      url: app.globalData.QUERY_AllFactoryVideo_URL,
      data: {},
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          FactoryData: res.data,
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (ops.from === 'button') {
      console.log(ops.target);
    }
    return {
      title: '污泥处理系统',
      path: 'packageManager/pages/factory/factory',
      success: function (res) {
        console.log("转发成功" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败" + JSON.stringify(res));
      }
    }
  },
  /**
   * 停止触摸按钮云台停止
   */
  stopPtz: function (e) {
    var direction = e.currentTarget.dataset.direction
    var deviceSerial = e.currentTarget.dataset.deviceserial

    var paramsString = 'direction=' + direction + '&deviceSerial=' + deviceSerial + '&accessToken=' + app.globalData.ACCESS_TOKEN + '&channelNo=' + app.globalData.CHANNEL_NO
    wx.request({
      url: app.globalData.STOP_PTZ_URL + '?' + paramsString,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
      },

      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 开始点击按钮启动云台
   */
  startPtz: function (e) {
    var direction = e.currentTarget.dataset.direction
    var deviceSerial = e.currentTarget.dataset.deviceserial
    var speed = e.currentTarget.dataset.speed
    this.stopPtz(e)

    var paramsString = 'direction=' + direction + '&speed=' + speed + '&deviceSerial=' + deviceSerial + '&accessToken=' + app.globalData.ACCESS_TOKEN + '&channelNo=' + app.globalData.CHANNEL_NO
    //  console.log(paramsString)
    wx.request({
      url: app.globalData.START_PTZ_URL + '?' + paramsString,
      data: {},
      method: 'POST',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
      },

      fail: function (err) {
        console.log(err)
      }
    })

  }
})