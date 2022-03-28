/** @format */
const HDWallterProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

require('dotenv').config();

const provider = new HDWallterProvider(
  process.env.MNEMONIC,
  process.env.RINKBEY_CONNECTION_URI
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const res = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there'],
    })
    .send({
      gas: '1000000',
      from: accounts[0],
    });

  console.log('Contract deployed to', res.options.address);

  provider.engine.stop();
};

deploy();
