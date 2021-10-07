require('dotenv').config();
const express = require('express');
const app = express();

const Web3 = require('web3');
const rpcURL = process.env.RPC_URL || 'http://localhost:8545';
web3 = new Web3(Web3.givenProvider || rpcURL || 'ws://localhost:8546');

const EthereumTx = require('ethereumjs-tx').Transaction;

const accounts = require('./db/accounts');

const getBalance = async (address) => {
  await web3.eth.getBalance(address, (err, wei) => {
    const balance = web3.utils.fromWei(wei, 'ether');
    console.log(`Address ${address} contains ${balance} wei on a balance.`);
  });
};

getBalance(accounts[0].address);
try {
  web3.eth.personal.newAccount('!@superpassword');
} catch (error) {
  console.log(error);
}
