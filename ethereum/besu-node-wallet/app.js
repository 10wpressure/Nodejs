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

const sendTransaction = async (sourceAccount, destinationAccount) => {
    await web3.eth.getTransactionCount(sourceAccount.address, (err, txCount) => {
        // Build the transaction
        const txParams = {
            nonce: web3.utils.toHex(txCount),
            to: destinationAccount.address,
            value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        };
        // Sign the transaction
        const tx = new EthereumTx(txParams);
        const privateKey = new Buffer.from(sourceAccount.privateKey, 'hex');
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');

        // Broadcast the transaction
        web3.eth.sendRawTransaction(raw, (err, txHash) => {
            console.log('txHash:', txHash);
            return txHash;
        });
        web3.eth.getTransactionReceipt(txHash);
    });
};

getBalance(accounts[1].address);
getBalance(accounts[4].address);
sendTransaction(accounts[1], accounts[4]);
getBalance(accounts[1].address);
getBalance(accounts[4].address);

// console.log(web3.eth.accounts.create());

// const mainRouter = require('./routes/main');

// const port = process.env.PORT || 3000;
// const start = async () => {
//   try {
//     app.listen(port, console.log(`Server is listening on port ${port}.`));
//   } catch (error) {
//     console.log(error);
//   }
// };
