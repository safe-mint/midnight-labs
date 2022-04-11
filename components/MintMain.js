import React, { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import midnightLabsGraphic from '../assets/midnight-labs-logo-paint.png'
import Image from 'next/image'
import { TransactionContext } from '../context/TransactionContext'
import cssStyles from '../styles/MintMain.module.css'
import { contractAddress } from '../lib/constants'

const style = {
  //wrapper: `w-screen flex items-center justify-center`,
  wrapper: ``,
  container: ``,
  contentWrapper: `flex relative justify-center flex-wrap items-center`,
  logoContainer: `w-1/2`,
  mintContainer: ``,
  mintHeader: `px-2 flex items-center justify-between font-semibold text-xl`,

  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,

  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  mintButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
  mintButtonDisabled: `bg-[#4c4954] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-not-allowed border border-[#2172E5]]`,
}


const MintMain = () => {
  const {connectWallet, currentAccount, currentAccountWhitelisted, sendTransaction} = useContext(TransactionContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    sendTransaction()
  }

  const renderNotConnectedContainer = () => (
    <button onClick={() => connectWallet()} className={`${cssStyles.ctaButton} ${cssStyles.connectWalletButton}`}>
      Connect Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={() => sendTransaction()} className={`${cssStyles.ctaButton} ${cssStyles.mintButton}`}>
      Mint NFT
    </button>
  )

  return (
    <div className={cssStyles.app}>
      {/* <Toaster position='top-center' reverseOrder={false}/> */}
      <div className={cssStyles.container}>
        <div className={cssStyles.headerContainer}>
          <p className={cssStyles.header}>Midnight Labs</p>
          <p className={cssStyles.subText}>MINT YOUR NFT</p>
          <p className={cssStyles.smallerSubText}>Only whitelisted members can mint.  <a href="/">Go here</a> to apply.</p>
          {!currentAccount ? renderNotConnectedContainer() : renderMintUI()}

          <div className="flex relative justify-center flex-wrap items-center">
          {currentAccount ? <p>Connected as {currentAccount.slice(0, 6)}...{currentAccount.slice(38)}</p> : ''}
          </div> 
        </div>
        <div className={cssStyles.footerContainer}>
          <p>Contract ID: {contractAddress.slice(0, 7)}...{contractAddress.slice(36)}</p>
        </div>
        <div className={cssStyles.circle1}></div>
        <div className={cssStyles.circle2}></div>
        <div className={`${cssStyles.wave} ${cssStyles.wave1}`}></div>
        <div className={`${cssStyles.wave} ${cssStyles.wave2}`}></div>
        {/* put little guy on wave3 */}
        <div className={`${cssStyles.wave} ${cssStyles.wave3}`}></div>
        <div className={`${cssStyles.wave} ${cssStyles.wave4}`}></div>


        {/* <div className={style.contentWrapper}>
          <div className={style.mintBox}></div>
          <div className={style.mintContainer}>
            <div className={style.mintHeader}>
              { currentAccount ? (currentAccountWhitelisted ? ('You are whitelisted to mint') : ('NOT Whitelisted')) : ('Must connect wallet before proceeding')}
            </div>
            {currentAccount && currentAccountWhitelisted ? 
              <div className={style.mintButton} onClick={e => handleSubmit(e)}>Mint</div> : 
              <div className={style.mintButtonDisabled}>{currentAccount ? '<disabled>' : 'Connect Wallet'}</div>
            }
          </div>

        </div> */}

      </div>
    </div>
  )
}

export default MintMain
