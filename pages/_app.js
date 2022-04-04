import '../styles/globals.css'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { TransactionProvider } from '../context/TransactionContext'

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
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </ThirdwebWeb3Provider>
  )
}

export default MyApp