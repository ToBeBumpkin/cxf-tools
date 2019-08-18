'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.demo.add()
  }
}

module.exports = DemoController;