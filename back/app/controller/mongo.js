'use strict';

const Controller = require('egg').Controller;

class DemoMongoController extends Controller {
  async find(){
    const { ctx } = this;
    let query = {}
    let limit = parseInt(ctx.query.limit)
    let skip = parseInt(ctx.query.skip)
    let res = await ctx.service.mongo.find(query,limit,skip)
    let count = await ctx.service.mongo.count()
    ctx.set("x-total",count)
    ctx.body = res
  }
  async insert(){
    const { ctx } = this;
    let obj = ctx.request.body
    let res = await ctx.service.mongo.insert(obj)
    ctx.body = res
  }
  async count(){
    const { ctx } = this
    let res = await ctx.service.mongo.count()
    ctx.body = res
  }
  async remove(){
    const { ctx } = this;
    let query = ctx.query
    let res = await ctx.service.mongo.remove(query)
    ctx.body = res
  }
  async update(){
    const { ctx } = this;
    let query = {"_id":ctx.request.body._id}
    let payload = ctx.request.body
    let upsert = false
    let res = await ctx.service.mongo.update(query,payload,upsert)
    ctx.body = res
  }
}

module.exports = DemoMongoController;