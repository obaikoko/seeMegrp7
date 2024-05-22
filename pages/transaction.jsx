import React, { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/metamask.module.css';

const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChanged(result[0]);
        })
        .catch((error) => {
          setErrorMessage('Failed to connect to MetaMask. Please try again.');
        });
    } else {
      setErrorMessage('Please install MetaMask.');
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [String(accountAddress), 'latest'],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch user balance.');
      });
  };

  return (
    <div className={styles.container}>
      <h1>MetaMask Wallet Connection</h1>

      <button onClick={connectWallet} className={styles.button} >Connect Wallet</button>
      <h3>Address: {defaultAccount}</h3>
      <h3>Balance: {userBalance} ETH</h3>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MetaMask;
