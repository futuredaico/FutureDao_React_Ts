const formatConfig = function (dateObj: Date)
{
  return {
    "M+": dateObj.getMonth() + 1,                 // 月份 
    "d+": dateObj.getDate(),                    // 日 
    "h+": dateObj.getHours(),                   // 小时 
    "m+": dateObj.getMinutes(),                 // 分 
    "s+": dateObj.getSeconds(),                 // 秒 
    "q+": Math.floor((dateObj.getMonth() + 3) / 3), // 季度 
    "S": dateObj.getMilliseconds()             // 毫秒 
  }
};
/**
 * 规范时间显示格式
 * @param fmt 规范的日期格式
 * @param dateNumber 时间戳
 * @param locale 显示语言
 */
export const format = function (fmt: string, dateNumber: string, locale: string)
{

  const dateTimer = formatUnixTime(dateNumber.toString());
  const dateObj = new Date(dateTimer);
  // 如果是英文
  if (locale === 'en')
  {
    const monthArray = new Array
      ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    const month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate().toString();
    if (day.length === 1)
    {
      day = "0" + day;
    }
    let hour = dateObj.getUTCHours().toString();
    if (hour.length === 1)
    {
      hour = '0' + hour;
    }
    let minute = dateObj.getUTCMinutes().toString();
    if (minute.length === 1)
    {
      minute = '0' + minute;
    }
    let second = dateObj.getUTCSeconds().toString();
    if (second.length === 1)
    {
      second = '0' + second;
    }
    return day + " " + monthArray[month] + " " + dateObj.getUTCFullYear() + " " + hour + ":" + minute + ":" + second + " GMT";
  }

  const o = formatConfig(dateObj);
  if (/(y+)/.test(fmt))
  {
    fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o)
  {
    if (new RegExp("(" + k + ")").test(fmt))
    {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
/**
 * 初始化时间戳
 * @param dateNumber 时间戳
 */
export const formatUnixTime = (dateNumber: string | number) =>
{
  return dateNumber.toString().length === 10 ? parseInt(dateNumber.toString(), 10) * 1000 : parseInt(dateNumber.toString(), 10);
}
/**
 * 计算时间差值
 * @param time 结束的时间戳
 * @param locale 显示语言
 */
export const computeTime = function (time: string, locale: string)
{
  // const date1 = '2015/05/01 00:00:00';  // 开始时间
  const nowTime = new Date().getTime();    // 当前时间
  const dateTimer = formatUnixTime(time);
  const endTime = new Date(dateTimer).getTime(); // 结束时间
  let differ = 0;
  if(endTime>nowTime){
    // 计算还剩余多少时间（结束时间-当前时间）
    differ = endTime - nowTime;   // 时间差的毫秒数
  }else{
    // 过去了多少时间（当前时间-结束时间）
    differ = nowTime - endTime;   // 时间差的毫秒数  
  }

  // 计算出相差天数
  const days = Math.floor(differ / (24 * 3600 * 1000))
  if (days > 0)
  {
    if (locale === 'en'){
      return days + ' days'
    }
    return days + '天'
  }
  // 计算出小时数
  const leave1 = differ % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  if (hours > 0)
  {
    if (locale === 'en'){
      return hours + ' hours'
    }
    return hours + '小时'
  }
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000)        // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  if (minutes > 5)
  {
    if (locale === 'en'){
      return minutes + ' minutes'
    }
    return minutes + '分钟'
  }
  // 计算相差秒数
  // const leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
  // const seconds = Math.round(leave3 / 1000)
  // if (seconds > 0)
  // {
  //   if (locale === 'en'){
  //     return seconds + ' seconds ago'
  //   }
  //   return seconds + '秒'
  // }
  
  if (locale === 'en'){
    return ''
  }
  return ''
}
/**
 * 剩余的时间显示
 * @param remainTime 剩余的时间戳
 */
export const onCountRemainTime = (remainTime:number) =>
{
  let d = 0;
  let h = 0;
  let m = 0;
  if (remainTime >= 0)
  {
    d = Math.floor(remainTime / 60 / 60 / 24);
    h = Math.floor(remainTime / 60 / 60 % 24);
    m = Math.floor(remainTime / 60 % 60);
  } else
  {
    return '' ;
  }
  // let hour = h.toString();
  // if (hour.length === 1)
  // {
  //   hour = '0' + hour;
  // }
  // let minute = m.toString();
  // if (minute.length === 1)
  // {
  //   minute = '0' + minute;
  // }
  const str = d+'d '+h+'h '+m+'min';
  console.log(str)
  return str;
}