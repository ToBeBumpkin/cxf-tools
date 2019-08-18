'use strict';

const axios = require("axios");
const request = require("async-request")
const cheerio = require("cheerio");
const http = require("http");


const Controller = require('egg').Controller;

class DateController extends Controller {
  async index() {
    const { ctx } = this;

    let res = await ctx.service.date.getHtml()
    let d = res.data

    let $ = cheerio.load(d)
    let txt = $(".g-h-d-txt").text()
    ctx.body = txt

  }
  async req() {
    const { ctx } = this
    const url = ctx.request.body.url

    let strHtml = await request(url)

    let body = strHtml.body
    let $ = cheerio.load(body);

    let resString;

    let strList = /(window\.rawData).*};/.exec(body);
    if(strList != null && strList.length > 0){
      let str = strList[0];
      str = str.substring(14, str.length - 1).trim().substring(1)
      resString = JSON.parse(str)
      console.log(resString.store)
    }
    ctx.body = resString
  }
}


module.exports = DateController;
