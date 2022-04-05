import React, { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import midnightLabsGraphic from '../assets/midnight-labs-logo-paint.png'
import Image from 'next/image'
import { TransactionContext } from '../context/TransactionContext'

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
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
  const {connectWallet, currentAccount, currentAccountWhitelisted} = useContext(TransactionContext)
  return (
    <div className={style.wrapper}>
      <Toaster position='top-center' reverseOrder={false}/>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          {/* <div className={style.logoContainer}>
            <Image src={midnightLabsGraphic} alt="midnight labs" height={200} width={100}/>
          </div> */}
          <div className={style.mintContainer}>
            <div className={style.mintHeader}>
              { currentAccount ? (currentAccountWhitelisted ? ('You are whitelisted to mint') : ('NOT Whitelisted')) : ('Must connect wallet before proceeding')}
            </div>
            <div className={`${currentAccount && currentAccountWhitelisted ? style.mintButton : style.mintButtonDisabled}`}>
              {currentAccount ? (currentAccountWhitelisted ? ('Mint') : ('<disabled>')) : ('Connect Wallet')}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default MintMain
