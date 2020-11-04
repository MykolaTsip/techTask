const chalk = require('chalk')


const {formService} = require('../service')

module.exports = {
    Message: async (req, res) => {
        try {
            const mss = req.body

            const newm = await formService.createmessage(mss)
            console.log(newm)

            res.redirect('https://t.me/joinchat/KED59hsAzc6kSHbt47RV_g')
        } catch (e) {
            console.log(chalk.red(e))
        }
    }
}


