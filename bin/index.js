#!/usr/bin/env node

const cron = require('node-cron')
const {fork} = require('child_process')

cron.schedule('*/1 * * * *', () => {
  const childProcess = fork(`${__dirname}/thread.js`)

  childProcess.send('execute')
})