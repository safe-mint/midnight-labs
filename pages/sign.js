
import Head from 'next/head'
import Image from 'next/image'
import { useWeb3 } from '@3rdweb/hooks'
import SignMain from '../components/SignMain'
import Header from '../components/Header'


const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}



const Home = () => {
  const { address, connectWallet } = useWeb3()
  return (
    <div className={style.wrapper}>
      {address ? (
        <>
          <Header/>
          <SignMain/>
          <div></div>
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet('injected')}
          >
            Connect Wallet
          </button>
          <div className={style.details}>
            You need to connect your wallet
            <br /> to be able to run this app.
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
