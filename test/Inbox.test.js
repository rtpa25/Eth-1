/** @format */

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

//changing the network is basically changing the provider
//this has multiple unlocked test accounts for testing purposes
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  //Use one of these accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) //ABI
    .deploy({
      data: bytecode,
      arguments: ['Hi there!'], //this is the newMessage for out Inbox constructor
    })
    .send({
      from: accounts[0],
      gas: '1000000', //
    });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    //checks if this is not undefined or null
    assert.ok(inbox.options.address);
  });

  it('it has a default message after being deployed', async () => {
    const message = await inbox.methods.message().call(); //first set of parens is basically a place to pass in arguments to the function and the second is basically details about that operation either it is calling a fucntion to retrive some data from the blockchain or it is a transaction
    assert.equal(message, 'Hi there!');
  });
});
