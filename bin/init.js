#!/usr/bin/env node

const path = require('path');
const {exec} = require('child_process');

const input = path.join(__dirname, '../.env.example');
const output = path.join(__dirname, '../.env');

exec(`cp ${input} ${output}`)