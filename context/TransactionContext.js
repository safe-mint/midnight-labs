import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { client } from '../lib/sanityClient'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  return transactionContract
}

export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [currentAccountWhitelisted, setCurrentAccountWhitelisted] = useState()
  const [currentSignature, setCurrentSignature] = useState()
  const [formData, setFormData] = useState({whitelistAddress: ''})

  useEffect(() => {
    checkIfWalletIsConnected()

    eth.on("accountsChanged", async function(accounts) {
      console.log('accountsChanged', accounts)
      checkIfWalletIsConnected()
    })

  }, [])

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('please install metamask')
      const accounts = await metamask.request({method: 'eth_requestAccounts'})
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0])
        updateAccountInfoFromDB(accounts[0])
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object')
    }
  }

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('please install metamask')
      const accounts = await metamask.request({method: 'eth_accounts'})
      console.log('checkIfWalletIsConnected:  ' + accounts[0])
      setCurrentAccount(accounts[0])
      updateAccountInfoFromDB(accounts[0])
      //(isAddressWhitelisted(accounts[0]))
      //console.log("currentAccountWhitelisted", currentAccountWhitelisted)

    } catch(error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const handleChange = (e) => {
    setFormData(prevState => ({...prevState, whitelistAddress: e.target.value.trim()}))
  }


  const updateAccountInfoFromDB = async (address) => {
    if (!address) return false
    const whitelistAddress = address.toLowerCase()
    const query = `*[_type == "signatures" && whitelistAddress == $whitelistAddress]`
    const params = {whitelistAddress: whitelistAddress}
    const records = await client.fetch(query, params)
    setCurrentAccountWhitelisted(records.length > 0)
    if (records.length > 0) {
      setCurrentSignature(records[0].signature)
    }
    console.log(query)
    console.log(params)
    console.log(records)
    console.log( records.length > 0)
    return true
  }

  const saveTransaction = async (
    whitelistAddress,
    signedHash,
    signature,
    signedBy = currentAccount
  ) => {
    const txDoc = {
      _type: 'signatures',
      _id: signedBy.toLowerCase() + whitelistAddress.toLowerCase(),
      signedBy: signedBy.toLowerCase(),
      whitelistAddress: whitelistAddress.toLowerCase(),
      signedHash: signedHash,
      signature: signature,
    }

    await client.createIfNotExists(txDoc)
  }

  const signAddress = async () => {
    const { whitelistAddress } = formData 
    const web3 = new Web3()
    const salt = 99;
    const hash = web3.utils.soliditySha3(whitelistAddress, salt)
    const signature = await eth.request({method: 'personal_sign', params: [hash, currentAccount]})
    console.log('signature: ' + signature)
    await saveTransaction(whitelistAddress, hash, signature)
  }

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      if (!metamask) return alert('Please install metamask')
      const transactionContract = getEthereumContract()
      const salt = 99
      const transactionHash = transactionContract.mintHiddenLabs(
        salt, 
        currentSignature
      )
      //await transactionHash.wait()
    } catch (error) { 
      console.log(error)
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        handleChange,
        signAddress,
        formData,
        currentAccountWhitelisted,
        sendTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}




