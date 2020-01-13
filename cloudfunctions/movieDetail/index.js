// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  return await rp(`https://douban.uieee.com/v2/movie/subject/${event.id}`)
    .then(res => {
      // Process html...
      console.log(res)
      return res
    })
    .catch(err => {
      // Crawling failed...
      console.error(err)
    });
}