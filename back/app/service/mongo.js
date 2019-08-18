
const Service = require('egg').Service

const dbconfig = require("../../config/db")
const colName = dbconfig.mongo.colName

const mongo = require("../dao/mongo")

class MongoService extends Service {
    async find(query,limit,skip) {
        const { ctx } = this
        let res = await mongo.find(colName,query,limit,skip)
        return res
    }
    async insert(res){
        await mongo.insert(colName,res)
        return await mongo.findOne(colName)
    }
    async count(query){
        return await mongo.count(colName,query)
    }
    async remove(query){
        return await mongo.remove(colName,query)
    }
    async update(query,payload,upsert){
        return await mongo.update(colName,query,payload,upsert)
    }
}


module.exports = MongoService