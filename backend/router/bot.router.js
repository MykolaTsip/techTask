const {Router} = require('express')

const botController = require('../controller/bot.controller')

const bot = Router()

bot.post('/', botController.Message)

module.exports = bot
