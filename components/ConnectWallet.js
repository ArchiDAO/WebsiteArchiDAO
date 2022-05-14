import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from '@thirdweb-dev/react';
import { AddressContext } from "../contexts/Address"
import React from "react"
// import {store, useGlobalState} from 'state-pool';
//
// store.setState("user",{address: '', transaction: '', active:''});


// import { Web3Context } from "../contexts/web3"

export const ConnectWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  // const address =
  const network = useNetwork();



    const [ state, setState ] = React.useContext(AddressContext)

    const hold_address = useAddress();

    // const [user, setUser, updateUser] = useGlobalState("user");
    // updateUser(function(user){
    //   user.address = state.address
    //   })
    // console.log(user.address)
    // console.log(state.address)
    // console.log('CW first.js')




    const disconnectWalletX = () => {
      // state.address = false
      setState({address: false,active:false})
      state.active = false
      state.address = false

      disconnectWallet()
      console.log(state)
      console.log('ConnectWallet.js disconnect')
    }

    const walletConnected = () => {
      if (state.active === false) {
        setState({address: hold_address, active: true})
      // dispatch({address: hold_address})
      // dispatch({active:true})
      state.address = hold_address
      state.active = true
      console.log(state)
      console.log('ConnectWallet.js connect')
      }
      // console.log(state.address)
      // console.log(state)
      // const {addressx,setAddress} = React.useContext(Web3Context)
      // if (state.address !== addressx){setAddress(state.address)}
      // else {console.log('why render?')}
      // console.log('pre-button render')
    }
  // If a wallet is connected, show address, chainId and disconnect button
  if (hold_address) {
    walletConnected()
    return (
      <>
        <button className="cw-button" onClick={() =>disconnectWalletX()}>{String(hold_address).slice(0,5)+'...'+String(hold_address).slice(-3)}</button>
      </>
    );
  }

  // If no wallet is connected, show connect wallet options
  return (
    <>
      <button className="cw-button" onClick={() => connectWithCoinbaseWallet()}>
        Coinbase Wallet
      </button>
      <button className="cw-button" onClick={() => connectWithMetamask()}>MetaMask</button>
      <button className="cw-button" onClick={() => connectWithWalletConnect()}>
        WalletConnect
      </button>
    </>
  );
};
