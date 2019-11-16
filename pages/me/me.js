// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputRecord:"",
    record: ["babsdbdiasdas", 1212121, "妮妮您为大部分被理念", 'dadas', '121', '34', "babsdbdiasdas", 1212121, "妮妮您为大部分被理念", 'dadas', '121', '34', "babsdbdiasdas", 1212121, "妮妮您为大部分被理念", 'dadas', '121', '34', "babsdbdiasdas", 1212121, "妮妮您为大部分被理念", 'dadas', '121', '34', "babsdbdiasdas", 1212121, "妮妮您为大部分被理念", 'dadas', '121', '34', "babsdbdiasdas", 1212121, "妮妮您为大部分被理念", 'dadas', '121', '34']

  },

  copyText: function(event) {
    wx.setClipboardData({
      data: String(event.currentTarget.dataset.content),
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },

  addInput: function(e){
    this.setData({
      inputRecord: String(e.detail.value)
    })
    console.log(this.data)
  },

  addRecord: function(){
    console.log(this.data)
    this.setData({
      record: this.data.record.push(this.data.inputRecord)
    })
    
    console.log(this.data.record)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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