#!/usr/bin/env node

require('dotenv/config')
const cron = require('node-cron')
const path = require('path')
const {fork} = require('child_process')

const DEFAULT_SCHEDULE = '*/5 * * * *'
const {SCHEDULE = DEFAULT_SCHEDULE} = process.env

cron.schedule(SCHEDULE, () => {
  const module = path.join(__dirname, 'thread.js')
  const childProcess = fork(module)

  childProcess.send('execute')
})