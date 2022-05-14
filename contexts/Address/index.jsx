import React, {useState, createContext} from "react"
import { reducer, initialState } from "./reducer"

export const AddressContext = createContext()

export const AddressProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  return (
    <AddressContext.Provider value={[ state, setState ]}>
    	{ children }
    </AddressContext.Provider>
  )
}
