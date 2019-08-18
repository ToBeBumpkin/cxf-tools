const Service = require('egg').Service
const cheerio = require("cheerio");

const request = require("request");
const superagent = require('superagent')

const url = 'http://mobile.yangkeduo.com/goods.html?goods_id=34987050&gallery_id=8146552109&refer_page_name=search_result&refer_page_id=10015_1560002758727_TmEZAQSYay&refer_page_sn=10015';


class DateService extends Service {
    async getHtml() {
        const { ctx } = this;
        let res = await ctx.curl(url, {
            dataType:'text'
        });
        return res
    }
    async getHtmlReq() {
        const { ctx } = this;
        let res = request({
            url: url,   // 请求的URL
            method: 'GET',                   // 请求方法
            headers: {                       // 指定请求头
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return body
            }
        });
        return res
    }
    async getHtmlSup() {
        const { ctx } = this;
        console.log("getHtmlSup")
        superagent.get(url)
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    return next(err);
                }
                console.log("end")
                // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
                // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                // 剩下就都是 jquery 的内容了
                // var $ = cheerio.load(sres.text);
                var items = [1, 1];
                // $('#topic_list .topic_title').each(function (idx, element) {
                //     var $element = $(element);
                //     items.push({
                //         title: $element.attr('title'),
                //         href: $element.attr('href')
                //     });
                // });

                return items
            });
    }
}


module.exports = DateService