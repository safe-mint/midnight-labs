import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { TransactionProvider } from '../context/TransactionContext'
import Head from 'next/head'

/**
 * The chain ID 4 represents the Rinkeby network
 * The `injected` connector is a web3 connection method used by Metamask
 */
const supportedChainIds = [4]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100&display=swap" rel="stylesheet"/>

    </Head>
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </ThirdwebWeb3Provider>
    </>
  )
}

export default MyApp