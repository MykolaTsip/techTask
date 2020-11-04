const db = require('../database').getInstance()
const chalk = require('chalk')

module.exports = {

    allmess: () => {
      try {
         const all = db.getModels('Form')

          return all.findAll({})
      }
      catch (e) {
          console.log(chalk.yellow(e))
      }
    },

    createmessage: (obj) => {
try {
    const newMess = db.getModels('Form')

    return newMess.create(obj, {new: true})
}
catch (e) {
    console.log(chalk.yellow(e))
}
    }
}
