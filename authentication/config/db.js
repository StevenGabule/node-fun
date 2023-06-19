const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/printshop')
.then(() => console.log('Database Connected!'))
.catch(err => console.error(err))

module.exports = mongoose;