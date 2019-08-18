'use strict';

const Controller = require('egg').Controller;

class DemoAxiosController extends Controller {
  async getfn(){
      const { ctx } = this;
      let res = ctx.query
      console.log(res)
      ctx.body = res
  }
  async postfn(){
      const { ctx } = this;
      let res = {
          d:ctx.request.body,
          q:ctx.query
      }
      console.log(res)
      ctx.body = res
  }
  async headfn(){
      const { ctx } = this;
      let res = ctx.request.body
      console.log(res)
      ctx.body = res
  }
  async deletefn(){
      const { ctx } = this;
      let res = ctx.query
      ctx.body = res
  }
}

module.exports = DemoAxiosController;