// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },

  goToEvaluate: function(event){
    // console.log(event)
    wx.navigateTo({
      url: `evaluate/evaluate?id=${event.target.dataset.movieid}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    wx.cloud.callFunction({
      name: 'movieList',
      data: {
        start: this.data.movieList.length, // '0',
        count: '10',
        city: ''
      }
    }).then(res=>{
      let resJSON = JSON.parse(res.result)
      console.log(resJSON)

      this.setData({
        movieList: this.data.movieList.concat(resJSON.subjects) // concat() 方法用于连接两个或多个数组
      })
    }).catch(err=>{
      console.error(err)
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

  }
})