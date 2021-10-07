const Web3 = require('web3');
const rpcURL = process.env.RPC_URL || 'http://localhost:8545';
web3 = new Web3(Web3.givenProvider || rpcURL || 'ws://localhost:8546');

console.log(web3.modules;);

// web3.eth.personal.newAccount('!@superpassword')
// .then(console.log);