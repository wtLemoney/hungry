export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) { // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  } // RegExp.$1为4个y
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
       }
}
  return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
