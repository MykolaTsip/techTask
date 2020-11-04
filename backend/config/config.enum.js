const dotenv = require('dotenv')

dotenv.config({})

module.exports = {
BOT_TOKEN_TELEGRAM: process.env.BOT_TOKEN || '',

    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_USERNAME_PASS: process.env.DB_USERNAME_PASS,

    DB_TABLE_NAME: process.env.DB_TABLE_NAME
}
