const sequelize = require('../utils/connection');
const userCreate = require('./createData/userCreate');
require('../models')

const testMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        await userCreate() //we introduce a user
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate()