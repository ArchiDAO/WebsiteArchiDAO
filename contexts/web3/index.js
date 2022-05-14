import {createContext,useState} from "react"

export const Web3Context = createContext()

export function Web3Provider({ children }){
  const [addressx , setAddressx] = useState({address: '',active: false, transaction: ''})
  const setAddress = (address) => {setAddressx({address:address})}
  return (
    <Web3Context.Provider value={{addressx , setAddress}}>
    	{ children }
    </Web3Context.Provider>
  )
}
