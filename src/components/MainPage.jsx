import React, { useEffect, useState } from 'react';
import { useAccount, useBalance, useFeeData } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import SendFunds from './SendFunds';
import Moralis from "moralis";

const MainPage = () => {
  const [transactions, setTransactions] = useState([])
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const [send, setSend] = useState(false)

  // console.log(address)
  const { data, isError, } = useBalance({
    address: address,
  })

  const runApp = async () => {
    await Moralis.start({
      apiKey: "RHzlOPG7sRwIAz9mvR9t7mg2i1evVWsieMjULdCvTBcgj1bE76HtmK4gQDJ2G0lJ",
    });

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address,
      chain: "0x5",
    });

    console.log(response.toJSON().result);
    setTransactions(response.toJSON().result)
  };

  useEffect(() => {
    runApp()
  }, [])
  return (
    <div>
      <header>
        <h2>Maxwell</h2>
        {address ? <button onClick={() => open()}>{address}</button> : <button onClick={() => open()}>Connect</button>}
      </header>
      {address ? <section className='main-con'>
        <h1>
          Balance: {data?.formatted} {data?.symbol}
        </h1>
        <div className='button'>
          {send ? <button onClick={() => setSend(false)}>Transactions </button> : <button onClick={() => setSend(true)}>Send </button>}
        </div>
        {send ? <SendFunds /> :
          <div>
            <h3>Transactions</h3>
            {transactions.length <= 0 ? <p className=''>No  transactions</p> : <div>
              {transactions.map((single) => <div className="card"> <p>From: {single.from_address}</p> <p>{single.block_timestamp.slice(0, 10)}</p> </div>)}
            </div>}
          </div>
        }
      </section> : <section>
        <div className="hero">
          <div>
            <h1>Welcome to the world of Secured Financing!</h1>
          </div>
          <img src="./scene-professional-esports-gamer-profile-colored-with-red-blue-light-generative-ai-removebg-preview.png" />
        </div>
        <div id="community">
          <h2>Join our Community!</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores eius consequuntur deleniti rerum impedit et. Incidunt, mollitia fugiat autem eligendi placeat delectus est tempora veritatis, in, fugit saepe magni velit.</p>
          <input placeholder='Enter your Email' type="text" />
          <button>Join US</button>
        </div>
        <footer>
          Copyright @ Maxwell 2023
        </footer>
      </section>
      }
    </div>
  );
};

export default MainPage;


