import './App.css'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, goerli } from 'wagmi/chains'
import MainPage from './components/MainPage'

const projectId = 'dd39b92709c63a9a5d0ee3b50cb6b81d'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


const chains = [goerli, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })
function App() {

  return (
    <WagmiConfig config={wagmiConfig}>
      <main>
        <MainPage />
      </main>
    </WagmiConfig>
  )
}

export default App
