const express = require('express')
const path = require('path')
const telegramBot = require('node-telegram-bot-api')
const dotenv = require('dotenv')

const botRouter = require('./router/bot.router')
const Config = require('./config/config.enum')
const instanse = require('./database').getInstance()
instanse.setModel()


const {formService} = require('./service')
const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.json())

dotenv.config({})



const token = Config.BOT_TOKEN_TELEGRAM

const bot = new telegramBot(token, {polling: true})

let notes = []


bot.onText(/команди/, (msg, match) => {

    bot.sendMessage(msg.chat.id || msg.from.id,
        '/нагадай - створює нагадування в форматі (/нагадай  ---> що нагадати (текст) ----> коли нагадати (в 14:30)) \n \n ' +
        '/всі повідомлення - виводить всі повідомлення які були надіслані з сайту http://se7ent.zzz.com.ua/ в форматі: \n \n' +
        'час надсилання повідомлення \n ' +
        "ім'я відправника \n" +
        "номер телефону відправника \n " +
        "повідомлення відправника")
})


bot.onText(/\/нагадай (.+) в (.+)/, function (msg, match) {
    let chatId = msg.chat.id || msg.from.id;

    let text = match[1];
    let time = match[2];

    notes.push( { 'uid':chatId, 'time':time, 'text':text } );

    bot.sendMessage(chatId, "Чудово! Обов'язково нагадаю! :)");
});

setInterval(function() {
    for (let i = 0; i < notes.length; i++){
        let curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if ( notes[i]['time'] == curDate ) {
            bot.sendMessage(notes[i]['uid'], 'Нагадую, ви повинні:  '+ notes[i]['text'] + ' зараз.');
            notes.splice(i,1);
        }
    }
},1000);


bot.onText(/\/всі повідомлення/, async (msg, match) => {

    const chatId = msg.chat.id || msg.from.id

    const allMess = await formService.allmess()

if (allMess) {
    const messJson = JSON.stringify(allMess)
    const mess = JSON.parse(messJson)

    for (let i = 0; i < mess.length; i++) {

        const user = mess[i]

       bot.sendMessage(chatId,
            `час надсилання повідомлення: ${user.created_at} \n ` +
            `ім'я відправника: ${user.name}\n` +
            `номер телефону відправника: ${user.phone}\n ` +
            `повідомлення відправника ${user.message}`)
    }

}

else {
    bot.sendMessage(chatId, 'No message')
}
})

server.use('/', botRouter)


server.listen(5001, (err) => {
    if (err) {
        console.log(err)
    }

    console.log('server is work!')
})


process.on("unhandledRejection", reason => {
    console.log(reason)

    // process.exit(0)
})
