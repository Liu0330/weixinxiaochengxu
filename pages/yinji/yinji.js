// pages/yinji/yinji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yesterday:false,
    today:true,
    tomorrow:false,
    order:false,
    timeline: false,
    eventList:[],
    reverseList:[],
    month:"",
    day:"",
    last:[],
    now:[],
    next:[],
    deviceWidth:'',
    deviceHeight:'',
    platform:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var page = this;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1; 
    this.getEventlist(month,day,page);
    
    var before = new Date();
    before.setTime(before.getTime()-24*3600*1000);
    var yesterday = [before.getMonth()+1,before.getDate()];
    var after = new Date();
    after.setTime(after.getTime()+24*2600*1000);
    var tomorrow = [after.getMonth()+1,after.getDate()];
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight,
          platform: res.platform
        });
      }
    });
    console.log(this.data.deviceHeight);
    page.setData({
      last: yesterday,
      next: tomorrow,
      now:[month,day]
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

  },

  showLast: function () {
    this.setData({
      yesterday: true,
      today:false,
      tomorrow:false
    })
    this.getEventlist(this.data.last[0],this.data.last[1],this);
  },

  showNow: function () {
    this.setData({
      yesterday: false,
      today: true,
      tomorrow: false
    })
    this.getEventlist(this.data.now[0], this.data.now[1], this);
  },

  showNext: function () {
    this.setData({
      yesterday: false,
      today: false,
      tomorrow: true
    })
    this.getEventlist(this.data.next[0], this.data.next[1], this);
  },

  showReverse: function(){
    this.setData({
      timeline:!this.data.timeline,
      order: !this.data.order
    })
  },

  getEventlist: function (month, day ,page){
    var mon_str, day_str;
    if (month > 9) {
      mon_str = String(month)
    } else {
      mon_str = "0" + String(month)
    }
    if (day > 9) {
      day_str = String(day)
    } else {
      day_str = "0" + String(day)
    }
    var day_mark = mon_str + day_str;

    page.setData({
      month: mon_str,
      day: day_str
    })
    var day_record, reverse_record;
    wx.request({
      url: 'https://baike.baidu.com/cms/home/eventsOnHistory/' + mon_str + '.json',
      method: 'GET',
      success: function (res) {
        day_record = res.data[mon_str][day_mark];
        reverse_record = new Array(day_record.length);
        for (var i = 0; i < day_record.length; i++) {
          day_record[i]['title'] = day_record[i]['title'].replace(/(<\/?a.*?>)/g, '');
          reverse_record[i] = day_record[i]
        }
        page.setData({
          eventList:day_record,
          reverseList:reverse_record.reverse()
        })
      },
      fail: function () {
        //fail
      },
      complete: function () {
        //complete
      }
    })    

  },

  //事件处理函数
  copyEvent: function (event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.variable,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
})