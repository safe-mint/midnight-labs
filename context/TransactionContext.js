import React, { useState, useEffect } from 'react'
import Web3 from 'web3'

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
      console.log('here ' + accounts[0])
      if (accounts.length) {
        setCurrentAccount(accounts[0])
        console.log('here ' + accounts[0])
      }
    } catch(error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const handleChange = (e) => {
    setFormData(prevState => ({...prevState, whitelistAddress: e.target.value.trim()}))
  }

  const signAddress = async () => {
    const { whitelistAddress } = formData 
    const web3 = new Web3()
    const salt = 99;
    const hash = web3.utils.soliditySha3(whitelistAddress, salt)
    const bb = await eth.request({method: 'personal_sign', params: [hash, currentAccount]})
    console.log(bb)
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




