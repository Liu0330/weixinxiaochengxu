var formatNumber = function(n){
  return(''+n)[1]?n:'0'+n;
};

var formatTime = function(t){
  const year = t.getFullYear();
  return t.getFullYear()+'年'+formatNumber(t.getMonth()+1)+'月'+formatNumber(t.getDate())+'日'+formatNumber(t.getHours())+':'+formatNumber(t.getMinutes())+':'+formatNumber(t.getSeconds());
};

var updateImg = function (t) {
  var h = t.getHours();
  var m = t.getMinutes();
  var s = t.getSeconds();
  var ke,sc_index,sc;
  var shichen = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']
  if (m>= 45) {
    ke = "四刻";
  } else if (m>= 30) {
    ke = "三刻";
  } else if (m>=15) {
    ke = "二刻";
  } else if (m>=0) {
    ke = "一刻";
  }
  var cz=h%2==0?"正":"初";
  if(h<23){
    sc_index=parseInt((h+1)/2);
  }else{
    sc_index=0;
  }
  sc=shichen[sc_index];
  const year = t.getFullYear();

  return [sc+cz+ke,sc_index];
}
module.exports = {formatTime,updateImg};
//module.exports = {updateImg};
