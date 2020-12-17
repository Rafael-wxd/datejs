// 日期的方法

// -------
//  ~当前时间
//    datejs()
//  
//  ~时间字符串
//    datejs('2018-06-03')
//  
//  ~时间戳
//    datejs(1528361259484)
//  
//  ~Date 对象
//    datejs(new Date(2018,8,18))
//  
//  ~复制
//    datejs().clone()
//  
//  ~检测当前 datejs 对象是否是一个有效的时间
//    datejs().isValid()
//  
//  ~获取
//    年 ： datejs().year()
//    月 ： datejs().month()
//    日 ： datejs().date()
//    星期 ： datejs().day()
//    时 ： datejs().hour()
//    分 ： datejs().minute()
//    秒 ： datejs().second()
//    毫秒 ： datejs().millisecond()
// 
//  ~设置
//    datejs().set('year',2017)
//    datejs().set('month',9)
//    
//  ~增加时间并返回一个新的 datejs() 对象
//  
//    datejs().add(7, 'day')
//    datejs().add(7, 'year')
//    
//  ~减少时间并返回一个新的 datejs() 对象
//    datejs().subtract(7, 'year')
//    datejs().subtract(7, 'month')
//    
//  ~返回当前时间的开头时间的 datejs() 对象，如月份的第一天。
//    datejs().startOf('year')
//    datejs().startOf('month')
//  
//  ~返回当前时间的末尾时间的 datejs() 对象，如月份的最后一天。
//    datejs().endOf('month')
//    datejs().endOf('year')
//  
//  ~格式化
//    datejs().format()
//    datejs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A')
//  
//  ~时间差
//    datejs('2018-06-08').diff(datejs('2017-06-01'), 'years')
//    datejs('2018-06-08').diff(datejs('2017-06-01'), 'day')
//    datejs('2018-06-08').diff(datejs('2017-06-01'), 'hour')
//  
//  ~Unix 时间戳 (毫秒)
//    datejs().valueOf()
//  
//  ~Unix 时间戳 (秒)
//    datejs().unix()
//  
//  ~返回月份的天数
//    datejs().daysInMonth()
//  
//  ~返回原生的 Date 对象
//    datejs().toDate()
//  
//  ~返回包含时间数值的数组
//    datejs().toArray()
//  
//  ~当序列化 datejs 对象时，会返回 ISO8601 格式的字符串
//    datejs().toJSON() //2018-06-08T02:44:30.599Z
//  
//  ~返回 ISO8601 格式的字符串
//    datejs().toISOString() //2018-06-08T02:46:06.554Z
//  
//  ~返回包含时间数值的对象
//    datejs().toObject()
//  
//  ~字符串
//    datejs().toString()
//  
//  ~检查一个 datejs 对象是否在另一个 datejs 对象时间之前
//    datejs('2018-06-01').isBefore(datejs('2018-06-02'))
//  
//  ~检查一个 datejs 对象是否和另一个 datejs 对象时间相同
//    datejs().isSame(datejs())
//  
//  ~检查一个 datejs 对象是否在另一个 datejs 对象时间之后
//    datejs().isAfter(datejs())
//    
//   ~日期格式
//    ------------------------------------------------------------
//    格式            含义            备注
//    ------------------------------------------------------------
//    yyyy            年
//    ------------------------------------------------------------
//    M               月              不补0
//    ------------------------------------------------------------
//    MM              月
//    ------------------------------------------------------------
//    W               周              不补0
//    ------------------------------------------------------------
//    WW              周
//    ------------------------------------------------------------
//    d               日              不补0
//    ------------------------------------------------------------
//    dd              日
//    ------------------------------------------------------------
//    H               小时             24小时制；不补0
//    ------------------------------------------------------------
//    HH              小时             24小时制
//    ------------------------------------------------------------
//    h               小时             12小时制；和A或a使用；不补0
//    -----------------------------------------------------------
//    hh              小时
//    ------------------------------------------------------------
//    m               分钟             不补0
//    ------------------------------------------------------------
//    mm              分钟
//    ------------------------------------------------------------
//    s               秒               不补0
//    ------------------------------------------------------------
//    ss              秒
//    ------------------------------------------------------------
//    A               AM/PM            大写
//    ------------------------------------------------------------
//    a               am/pm            小写
//    ------------------------------------------------------------
//    timestamp       js时间戳
//    ------------------------------------------------------------
// -------

const repairStart = (string, length, pad) => {
  const s = String(string)
  if (!s || s.length >= length) return string
  return `${Array((length + 1) - s.length).join(pad)}${string}`
}

const monthDiff = (a, b) => {
  if (a.$day < b.$day) return -monthDiff(b, a);
  const countMonth = ((b.$year - a.$year) * 12) + (b.$month - a.$month);
  const anchor = a.clone().add('month', countMonth);
  const c = b.$date - anchor.$date < 0;
  const anchor2 = a.clone().add('month', countMonth + (c ? -1 : 1));

  return +(-(countMonth + ((b.$date - anchor.$date) / (c ? (anchor.$date - anchor2.$date) :
    (anchor2.$date - anchor.$date)))) || 0);
}

// 日期设置获取属性
const dateFunction = {
  year: {
    get: 'getFullYear',
    set: 'setFullYear',
    index: 0
  },
  month: {
    get: 'getMonth',
    set: 'setMonth',
    index: 1
  },
  day: {
    get: 'getDate',
    set: 'setDate',
    index: 2
  },
  hours: {
    get: 'getHours',
    set: 'setHours',
    index: 3
  },
  minutes: {
    get: 'getMinutes',
    set: 'setMinutes',
    index: 4
  },
  seconds: {
    get: 'getSeconds',
    set: 'setSeconds',
    index: 5
  },
  milliseconds: {
    get: 'getMilliseconds',
    set: 'setMilliseconds',
    index: 6
  }
};

// 转换为时间类型
const parseDate = function (config) {
  const { date } = config;
  if (date === null) return new Date(NaN);
  if (date === undefined) return new Date();
  if (date instanceof Date) return new Date(date);
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const dateInfo = date.match(/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/);
    if (dateInfo) {
      const year = dateInfo[1] || new Date()[dateFunction['year'].get]();
      const month = dateInfo[2] - 1 || 0;
      const day = dateInfo[3] || 1;
      const hours = dateInfo[4] || 0;
      const minutes = dateInfo[5] || 0;
      const seconds = dateInfo[6] || 0;
      const milliseconds = (dateInfo[7] || '0').substring(0, 3);
      return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    }
  }
  return new Date(date);
};

// 工具类
class Datejs {
  constructor (config) {
    this.parse(config);
  }
  // 转换为时间格式
  parse (config) {
    this.$date = parseDate(config);
    this.init(config);
  }
  // 初始化暴露时间详细参数
  init () {
    const { $date } = this;
    Object.keys(dateFunction).forEach((key) => {
      this['$' + key] = $date[dateFunction[key].get]();
    });
    this.$week = $date.getDay(); // 周
  }
  // 获取时间详细参数
  get (getKey) {
    for (let key in dateFunction) {
      if (getKey === key) {
        return this['$' + key];
      }
    }
    return this.$date;
  }
  // 设置时间详细参数
  set (setKey, newValue) {
    const newDatejs = this.clone();
    for (let key in dateFunction) {
      if (setKey === key) {
        newDatejs.$date[dateFunction[key].set](newValue);
        newDatejs.init();
        break;
      }
    }
    return newDatejs;
  }
  // 增加时间并返回一个新的对象
  add (addKey, step) {
    const newDatejs = this.clone();
    for (let key in dateFunction) {
      if (addKey === key) {
        const oldValue = newDatejs.$date[dateFunction[key].get]();
        return this.set(key, oldValue + step);
      }
    }
    return newDatejs;
  }
  // 减少时间并返回一个新的对象
  subtract (subtractKey, step) {
    return this.add(subtractKey, step * -1);
  }
  strEndOf (strEndKey, arr) {
    const startKeyIndex = dateFunction[strEndKey] ? dateFunction[strEndKey].index : 0;
    Object.keys(dateFunction).forEach((key) => {
      const ind = dateFunction[key].index;
      if (startKeyIndex >= ind) {
        arr[ind] = this['$' + key];
      }
    });
    return datejs(new Date(...arr));
  }
  // 返回当前时间开头的时间datejs对象
  startOf (startKey) {
    return this.strEndOf(startKey, [this.$year, 0, 1, 0, 0, 0, 0]);
  }
  // 返回当前时默认的时间datejs对象
  endOf (endKey) {
    return this.strEndOf(endKey, [this.$year, 11, 31, 23, 59, 59, 999]);
  }
  // 格式化
  format (format) {
    const {
      $date,
      $year,
      $month,
      $day,
      $hours,
      $minutes,
      $seconds,
      $milliseconds,
      $week } = this;

    const formatStr = format || 'yyyy-MM-dd HH:mm:ss';

    const twelveHours = function (hours, isRepairStart) {
      hours = hours > 12 ? hours - 12 : hours;
      return isRepairStart ? repairStart(hours, 2, '0') : hours;
    };

    const getAp = function (hours, isLowercase) {
      const ap = (hours < 12 ? 'AM' : 'PM');
      return isLowercase ? ap.toLowerCase() : ap;
    };

    const matches = {
      YY: String($year).slice(-2),
      YYYY: $year,
      M: $month,
      MM: repairStart($month, 2, '0'),
      d: $day,
      dd: repairStart($day, 2, '0'),
      W: $week,
      WW: repairStart($day, 2, '0'),
      H: $hours,
      HH: repairStart($hours, 2, '0'),
      h: twelveHours($hours),
      hh: twelveHours($hours, true),
      m: $minutes,
      mm: repairStart($minutes, 2, '0'),
      s: $seconds,
      ss: repairStart($seconds, 2, '0'),
      sss: $milliseconds,
      A: getAp($hours),
      a: getAp($hours, true),
      timestamp: new Date($date).getTime()
    };

    return formatStr.replace(/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS|timestamp/g, (match, $1) => {
      return $1 || matches[match];
    });
  }
  // 时间差
  diff (diffDate, key, float) {
    const startDate = this;
    const endDate = datejs(diffDate);
    const zoneDelta = (endDate.utcOffset() - startDate.utcOffset()) * 60;
    const seconds = (startDate.$date - endDate.$date) / 1000;
    const month = monthDiff(startDate, endDate);
    const ret = {
      year: month / 12,
      month: month,
      day: (seconds - zoneDelta) / (60 * 60 * 24),
      hours: (seconds - zoneDelta) / (60 * 60),
      minutes: (seconds - zoneDelta) / 60,
      seconds: seconds,
      milliseconds: seconds * 1000,
    }[key];
    return float ? ret : ret < 0 ? Math.ceil(ret) || 0 : Math.floor(ret);
  }
  utcOffset () {
    return -Math.round(this.$date.getTimezoneOffset() / 15) * 15;
  }
  // 时间戳(毫秒)
  valueOf () {
    return this.$date.getTime();
  }
  // 时间戳(秒)
  unix () {
    return Math.floor(this.valueOf() / 1000);
  }
  // 返回月份的天数
  daysInMonth () {
    return this.endOf('month').$day;
  }
  // 返回原生的Date对象
  toDate () {
    return new Date(this.valueOf());
  }
  // 返回ISO8601格式的字符串
  toISOString () {
    return this.$date.toISOString();
  }
  // 当序列化datejs对象是，返回ISO861格式的字符串
  toJSON () {
    return this.isValid() ? this.toISOString() : null;
  }
  // 返回字符串
  toString() {
    return this.$date.toUTCString();
  }
  // 检查datejs是否在另一个datejs之前
  isBefore(date) {
    return this.$date < datejs(date).$date;
  }
  // 检查datejs对象是否和另一个datejs对象相同
  isSame(date) {
    const other = datejs(date)
    return this.$date <= other && other <= this.$date;
  }
  // 检查datejs是否在另一个datejs之后
  isAfter(date) {
    return datejs(date) < this.$date;
  }
  // 判断是否为时间对象
  isValid () {
    return this.$date.toString() !== 'Invalid Date';
  }
  // 克隆当前对象
  clone () {
    return datejs(this.$date);
  }
}

// 注册器
const datejs = function (date, config) {
  if (date instanceof Datejs) {
    return date;
  }

  config = typeof config === 'object' ? config : {};
  config['date'] = date;
  return new Datejs(config);
};

const dateProto = Datejs.prototype
datejs.prototype = dateProto;
Object.keys(dateFunction).forEach((key) => {
  dateProto[key] = function () {
    return this['$' + key];
  }
});

export default datejs;
