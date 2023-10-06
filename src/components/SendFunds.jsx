import { useState } from 'react';
import { useSendTransaction, usePrepareSendTransaction, useAccount } from 'wagmi'
import { parseEther } from 'viem'

const SendFunds = () => {
  const [resciver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const { address } = useAccount()

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    from: address,
    to: resciver,
    value: parseEther('0.001'),
  })

  return (
    <div className='send'>
      <h3>Send Crypto</h3>
      <div>
        <input onChange={e => setReceiver(e.target.value)} type="text" placeholder='Receivers address' />
      </div>
      <div>
        <input onChange={e => setAmount(e.target.value)} type="text" placeholder='Amount' />
      </div>
      <div>
        <button onClick={() => sendTransaction()}> {isLoading ? 'loading' : 'Send'}</button>
      </div>
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default SendFunds;