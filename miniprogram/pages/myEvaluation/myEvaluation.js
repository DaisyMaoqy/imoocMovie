// pages/myEvaluation/myEvaluation.js
const db = wx.cloud.database();
const evaluateCollection = db.collection('evaluate');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluationList: {},
    activeNames: ['']
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  getOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res)
      return res
    }).catch(err => {
      console.log(err)
    });
  },

  getEvaluateList: function(param){
    let openId = this.getOpenId()
    evaluateCollection.where({
      _openid: openId
    }).get()
      .then(res => {
        console.log(res)
        this.setData({
          evaluationList : res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvaluateList()
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

  }
})