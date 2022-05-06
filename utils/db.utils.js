const mongoose = require('mongoose')

mongoose.Promise = global.Promise

function connect() {
    mongoose.connect(process.env.DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true })
}
module.exports = {
    mongoose,
    connect
}
