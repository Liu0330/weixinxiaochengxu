//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    deviceWidth: '',
    deviceHeight: '',
    platform: '',
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    imgUrls: ["../../images/time/001.jpeg", "../../images/time/002.jpeg", "../../images/time/003.jpeg", "../../images/time/004.jpeg", "../../images/time/005.jpeg", "../../images/time/006.jpeg", "../../images/time/007.jpeg", "../../images/time/008.jpeg", "../../images/time/009.jpeg", "../../images/time/010.jpeg", "../../images/time/011.jpeg", "../../images/time/012.jpeg"],
    imgUrl:'../../images/time/001.jpeg',
    dateInfo:"Hello World",
    dateTime:[],
    nowTime:'',
    shichen:'',
    scIndex:0,
    detail: ["【子时】夜半，又名子夜、中夜：十二时辰的第一个时辰。（23时至01时）。", "【丑时】鸡鸣，又名荒鸡：十二时辰的第二个时辰。（01时至03时）。", "【寅时】平旦，又称黎明、早晨、日旦等：时是夜与日的交替之际。（03时至05时）。", "【卯时】日出，又名日始、破晓、旭日等：指太阳刚刚露脸，冉冉初升的那段时间。（05时至07时）。", "【辰时】食时，又名早食等：古人“朝食”之时也就是吃早饭时间，（07时至09时）。", "【巳时】隅中，又名日禺等：临近中午的时候称为隅中。（09 时至11时）。", '【午时】日中，又名日正、中午等：（11时至13时）。', '【未时】日昳，又名日跌、日央等：太阳偏西为日昳。（13时至15时）。', '【申时】晡时，又名日铺、夕食等：（15时至17时）。', '【酉时】日入，又名日落、日沉、傍晚：意为太阳落山的时候。（17时至19时）。', '【戌时】黄昏，又名日夕、日暮、日晚等：此时太阳已落山，天将黑未黑。天地昏黄，万物朦胧，故称黄昏。（19时至21时）。','【亥时】人定，又名定昏等：此时夜色已深，人们已经停止活动，安歇睡眠了。人定也就是人静。（21时至23时）。']
  },
  //事件处理函数
  copyText: function(){
    wx.setClipboardData({
      data: this.data.dateInfo,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight,
          platform: res.platform
        });
      }
    });
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var week = ['日', '一', '二', '三', '四', '五', '六']
    var weekday = week[date.getDay()]
    var total,dayOrder,percent,dateText;
    if ((year%100==0&&year%400==0)||(year%100!=0&&year%4==0)){
      total = 366;
    }else{
      total = 365
    }
    dayOrder = Math.ceil((new Date() - new Date(new Date().getFullYear().toString())) / (24 * 60 * 60 * 1000));
    percent = (dayOrder / total * 100).toFixed(2);
    dateText = "今天是"+year+"年"+month+"月"+day+"日，星期"+weekday+"，今年的第"+dayOrder+"天，这一年"+percent+"%的时间已流逝。";
    
    this.setData({ 
      dateInfo: dateText,
      dateTime:[date]

    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShareAppMessage: function(){
    return {
      title: '推荐时间印记给你',
      desc: '做时间的记录者',
      path: '/page/user?id=123'
    }
  },

  onShow: function(){
    var commonFunction = require('../../pages/index/common'),
    that = this;

    var interval = setInterval(function(){


      that.setData({
        nowTime: commonFunction.formatTime(new Date()),
        shichen: commonFunction.updateImg(new Date())[0],
        scIndex: commonFunction.updateImg(new Date())[1],
        imgUrl: that.data.imgUrls[commonFunction.updateImg(new Date())[1]]
      })

    },1000);
  }
})
