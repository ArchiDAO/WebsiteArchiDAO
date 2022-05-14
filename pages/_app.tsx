import { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AddressProvider } from "../contexts/Address"
import { Web3Provider } from "../contexts/web3"

import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)



import '../styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = 80001;
   /* Make sure that your app is wrazpped with these contexts.
   * If you're using React, you'll have to replace the Component setup with {children}
   */
  return (
    <>
    <Web3Provider>
    <AddressProvider>
    <ThirdwebProvider desiredChainId={desiredChainId}>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </ThirdwebProvider>
    </AddressProvider>
    </Web3Provider>
    </>
  );
}

export default MyApp
