// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  /**
   *  获取正在热映的电影：
   *  接口：https://api.douban.com/v2/movie/in_theaters
   *   一个豆瓣 API 的代理服务
   *   https://douban.uieee.com
   * 
   *   访问参数：
   *   start: 数据的开始项
   *   count：单页条数
   *   city：城市
   */
  return await rp(`https://douban.uieee.com/v2/movie/in_theaters?start=${event.start}&count=${event.count}&city=${event.city}`)
    .then( res => {
      // Process html...
      console.log(res)
      return res
    })
    .catch(err => {
      // Crawling failed...
      console.error(err)
    });

}