const Web3 = require('web3');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: 'http://localhost:8545',
  moonbase: 'https://rpc.testnet.moonbeam.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network
const accounts = require('./db/accounts');
const accountFrom = {
  privateKey: accounts[2].privateKey,
  address: accounts[2].address,
};
const addressTo = accounts[3].address; // Change addressTo

/*
   -- Create and Deploy Transaction --
*/
const deploy = async () => {
  console.log(
    `Attempting to send transaction from ${accountFrom.address} to ${addressTo}`,
  );

  // Sign Tx with PK
  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      gas: 21000,
      to: addressTo,
      value: web3.utils.toWei('1', 'ether'),
    },
    accountFrom.privateKey,
  );

  // Send Tx and Wait for Receipt
  const createReceipt = await web3.eth.sendRawTransaction(
    createTransaction.rawTransaction,
  );
  console.log(web3.eth.sha3(createTransaction.rawTransaction));
  console.log(
    `Transaction successful with hash: ${createReceipt.transactionHash}`,
  );
};

// Balance call
const balances = async () => {
  const balanceFrom = web3.utils.fromWei(
    await web3.eth.getBalance(accountFrom.address),
    'ether',
  );
  const balanceTo = web3.utils.fromWei(
    await web3.eth.getBalance(addressTo),
    'ether',
  );

  console.log(
    `The balance of ${accountFrom.address} and ${addressTo} is: ${balanceFrom} ETH.`,
  );
  console.log(`The balance of ${addressTo} is: ${balanceTo} ETH.`);
};

balances();
deploy();
balances();
