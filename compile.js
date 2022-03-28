/** @format */

const path = require('path');
const fs = require('fs');
const solc = require('solc');

//get the path to inbox.sol
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

//read all the source code out of the file
const inboxSource = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(inboxSource, 1).contracts[':Inbox'];
