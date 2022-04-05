import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { client } from '../lib/sanityClient'

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}


export const TransactionProvider = ({children}) => {
  const [currentAccount, setCurrentAccount] = useState()
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
      setCurrentAccount(accounts[0])
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

    } catch(error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const handleChange = (e) => {
    setFormData(prevState => ({...prevState, whitelistAddress: e.target.value.trim()}))
  }

  const saveTransaction = async (
    whitelistAddress,
    signedHash,
    signature,
    signedBy = currentAccount
  ) => {
    const txDoc = {
      _type: 'signatures',
      _id: signedBy + whitelistAddress,
      signedBy: signedBy,
      whitelistAddress: whitelistAddress,
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

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        handleChange,
        signAddress,
        formData
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}




