## 一个轻量级的时间处理器

### datejs的使用

```
datejs()
```

### datejs的方法

| 描述                                                     | 使用方式                                                     | 参数                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| 获取当前时间                                             | datejs()                                                     | 传入有效的时间格式 字符串(2020-12-17 ...)/new Date()/时间戳 |
| 克隆当前时间对象                                         | datejs().clone()                                             |                                                             |
| 是否是正确的日期格式                                     | datejs().isValid()                                           |                                                             |
| 获取年                                                   | datejs().year()                                              |                                                             |
| 获取月                                                   | datejs().month()                                             |                                                             |
| 获取日                                                   | datejs().date()                                              |                                                             |
| 获取小时                                                 | datejs().hour()                                              |                                                             |
| 获取分钟                                                 | datejs().minute()                                            |                                                             |
| 获取秒                                                   | datejs().second()                                            |                                                             |
| 获取毫秒                                                 | datejs().millisecond()                                       |                                                             |
| 获取周                                                   | datejs().week()                                              |                                                             |
| 设置时间并返回新的datejs                                 | datejs().set('year',2017)                                    | 日期名称(参考日期名称), 新的时间                            |
| 增加时间并返回新的datejs                                 | datejs().add('day, 7')                                       | 日期名称(参考日期名称), 增加的数量                          |
| 减少时间并返回新的datejs                                 | datejs().subtract(7, 'year')                                 | 日期名称(参考日期名称), 减少的数量                          |
| 返回当前时间的开头时间的 datejs() 对象，如月份的第一天   | datejs().startOf('year')                                     | 日期名称(参考日期名称)                                      |
| 返回当前时间的末尾时间的 datejs() 对象，如月份的最后一天 | datejs().endOf('month')                                      | 日期名称(参考日期名称)                                      |
| 格式化                                                   | datejs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A')            | 日期格式(参考日期格式)                                      |
| 时间差                                                   | datejs('2020-12-17').diff(datejs('2021-12-18'), 'years', true) | datejs, 日期名称(参考日期名称), 是否小数                    |
| Unix 时间戳 (毫秒)                                       | datejs().valueOf()                                           |                                                             |
| Unix 时间戳 (秒)                                         | datejs().unix()                                              |                                                             |
| 返回月份的天数                                           | datejs().daysInMonth()                                       |                                                             |
| 返回原生的 Date 对象                                     | datejs().toDate()                                            |                                                             |
| 当序列化 datejs 对象时，会返回 ISO8601 格式的字符串      | datejs().toJSON()                                            |                                                             |
| 返回 ISO8601 格式的字符串                                | atejs().toISOString()                                        |                                                             |
| UTC字符串                                                | datejs().toString()                                          |                                                             |
| 检查一个 datejs 对象是否在另一个 datejs 对象时间之前     | datejs().isBefore(datejs('2021-12-17'))                      | datejs                                                      |
| 检查一个 datejs 对象是否和另一个 datejs 对象时间相同     | datejs().isSame(datejs())                                    | datejs                                                      |
| 检查一个 datejs 对象是否在另一个 datejs 对象时间之后     | datejs().isAfter(datejs(‘2021-12-17’))                       | datejs                                                      |

### 日期名称

1. year
2. month
3. day
4. hours
5. minutes
6. seconds
7. milliseconds

### 日期格式

使用format时指定输入框的格式

| 格式      | 含义     | 备注                        | 举例          |
| --------- | -------- | --------------------------- | ------------- |
| yyyy      | 年       |                             | 2020          |
| M         | 月       | 不补0                       | 1             |
| MM        | 月       |                             | 01            |
| W         | 周       | 不补0                       | 1             |
| WW        | 周       |                             | 01            |
| d         | 日       | 不补0                       | 2             |
| dd        | 日       |                             | 02            |
| H         | 小时     | 24小时制不补0               | 3             |
| HH        | 小时     | 24小时制                    | 03            |
| h         | 小时     | 12小时制；和A或a使用；不补0 | 3             |
| hh        | 小时     | 12小时制；和A或a使用        | 03            |
| m         | 分钟     | 不补0                       | 4             |
| mm        | 分钟     |                             | 04            |
| s         | 秒       | 不补0                       | 5             |
| ss        | 秒       |                             | 05            |
| A         | AM/PM    | 大写                        | AM            |
| a         | am/pm    | 小写                        | am            |
| timestamp | JS时间戳 |                             | 1608184694486 |

