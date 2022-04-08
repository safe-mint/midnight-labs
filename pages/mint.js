import React from 'react'
import Header from '../components/Header'
import MintMain from '../components/MintMain'

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] select-none flex flex-col justify-between`,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

const Mint = () => {
  return (
    <div className={style.wrapper}>
      <>
        {/* <Header/> */}
        <MintMain/>
        <div></div>
      </>
    </div>
  )
}

export default Mint
