const Service = require('egg').Service

class DemoService extends Service {
    async add(uid) {
        let user = {
            name:'chengxiaofei',
            age:23,
            sex:'man'
        }
        return user
    }
}


module.exports = DemoService