'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async indexadd() {
    const { ctx } = this;
    ctx.body = 'add 路由';
  }
}

module.exports = HomeController;
