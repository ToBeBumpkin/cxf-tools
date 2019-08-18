const dbconfig = require("../../config/db")
const db = require('monk')(`${dbconfig.mongo.url}${dbconfig.mongo.dbName}`)

module.exports = {
    find:async (colName, query = {}, limit = null, skip = null) => {
        try {
            return await db.get(colName).find(
                query,
                {
                    limit: limit,
                    skip: skip,
                })
        } catch (err) {
            console.error(err)
        }
    },
    count:async (colName,query) => {
        try{
            return await db.get(colName).count(query)
        }catch(err){
            console.error(err)
        }
    },
    insert:async (colName, payload) => {
        if (!payload) return;
        let errs = 0
        try {
            await db.get(colName).insert(payload, {ordered: false})
        } catch (e) {
            errs += e.writeErrors ? e.writeErrors.length : 1
        }
        return errs
    },
    findOne: async (colName, query = {}) => {
        try {
            return await db.get(colName).findOne(query)
        } catch (err) {
            console.error(err)
        }
    },
    update:async (colName,query = {}, payload, upsert) => {
        if (!payload) return;
        let update = {}
        let $set = {}
        let $addToSet = {}
        let $setOnInsert = {
            createdAt: Date.now()
        }

        Object.keys(payload).forEach(key => {
            payload[key] instanceof Set
                ? $addToSet[key]={$each:[...payload[key]]}
                : $set[key] = payload[key]
        })

        if (Object.keys($set).length) {
            update.$set = $set
        }

        if(Object.keys($addToSet).length){
            update.$addToSet = $addToSet
        }

        update.$setOnInsert = $setOnInsert

        try{
            return await db.get(colName).update(query,update,{upsert:upsert || false})
        }catch (err){
            console.error(err)
        }
    },
    remove:async (colName,query = {}) => {
        try{
            return await db.get(colName).remove(query)
        }catch(err){
            console.error(err)
        }
    }
}