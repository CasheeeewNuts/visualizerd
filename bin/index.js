#!/usr/bin/env node

const cron = require('node-cron')
const {main} = require("../lib/main")

cron.schedule('*/1 * * * *', main)