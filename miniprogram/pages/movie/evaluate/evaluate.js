// pages/movie/evaluate/evaluate.js
const db = wx.cloud.database();// init database
const evaluateCollection = db.collection('evaluate')// 找到数据库对应集合

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    movieId: -1,
    score: 0,
    content: '',
    images: [],
    imagesVant: [],
    imgList: []
  },

  onContentChange: function (event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      content: event.detail
    });
  }, 
  
  onScoreChange: function (event) {
    this.setData({
      score: event.detail
    });
  },

  uploadImg: function (event) {
    console.log(event.detail)
    this.setData({
      imagesVant: this.data.imagesVant.concat(event.detail.file)
    })
    // 上传 1
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: res => {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //     console.log(tempFilePaths)
    //     let tempFileObj = {
    //       url: tempFilePaths[0],
    //       name: new Date().getTime()
    //     }
    //     this.setData({
    //       images: this.data.images.concat(tempFilePaths),
    //       imagesVant: this.data.imagesVant.concat(tempFileObj)
    //     })
    //   }
    // })
  },

  submit: function () {
    let param ={}
    param.score = this.data.score
    param.content = this.data.content
    param.movieId = this.data.detail.movieId
    param.movieTitle = this.data.detail.title
    param.original_title = this.data.detail.original_title
    param.directors = this.data.detail.directors[0].name
    param.images = this.data.detail.images.large
    

    // 存储图片后上传全部数据
    let imagesArr = this.data.imagesVant
    let imagesUpTask = imagesArr.map((item, index, array) => {
      let fileSuffix = item.path.match(/\.[^\.]+$/) // 获取文件后缀名
      // console.log(f2[0])
      // 上传img
      return wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '' + fileSuffix[0], // 'example.png',
          filePath: item.path, // 文件路径 只能string
        }).then(res => {
          // get resource ID
          console.log("上传img" + res.fileID)
          return res.fileID
        }).catch(error => {
          // handle error
          console.log(error)
        })
    });
    // 捕捉所有上传事务
    Promise.all(imagesUpTask).then(data => {
      console.log(data);
      // wx.showToast({ title: '上传成功', icon: 'none' });
      let newFileList = []
      data.map((item, i) => {
        newFileList[i] = {}
        newFileList[i].url = item
      });
      this.setData({ 
        imgList: newFileList 
      });

      // 写入数据库
      param.imgList = this.data.imgList
      if (param.score > 0){
        evaluateCollection.add({
          data: param
        }).then(res => {
          console.log(res)
          wx.showToast({ title: '保存成功', icon: 'none' });
          wx.navigateBack({
            delta: 2
          })
        }).catch(err => {
          console.log(err)
          wx.showToast({ title: '保存失败', icon: 'none' });
        })
      }else{
        wx.showToast({ title: '请打分', icon: 'none' });
      }      

    }, reason => {
    console.log(reason)
    })
    .catch(e => {
      // wx.showToast({ title: '上传失败', icon: 'none' });
      console.log(e);
    });   
    console.log(param)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      movieId: options.id
    })
    wx.showLoading({
      title: 'loading~~',
    })
    wx.cloud.callFunction({
      name: 'movieDetail',
      data: {
        id: options.id
      }
    }).then(res => {
      console.log(res)
      let resJSON = JSON.parse(res.result)
      console.log(resJSON)
      this.setData({
        detail: resJSON 
      })
      wx.hideLoading()
    }).catch(err => {
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