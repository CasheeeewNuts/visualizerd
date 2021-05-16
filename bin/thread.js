const {main} = require('../lib/main')

process.once('message', main)