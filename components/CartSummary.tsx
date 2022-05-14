import React, { useState, useEffect, useCallback } from 'react'
import {
  useNetwork,
  useAddress,
} from '@thirdweb-dev/react';
import Web3 from 'web3';
import StripeTestCards from '../components/StripeTestCards'
import { CWload } from '../components/CWload';
import { AddressContext } from "../contexts/Address"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useShoppingCart } from 'use-shopping-cart/react'
import { fetchPostJSON } from '../utils/api-helpers'
const CartSummary = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(true)
  const [cartEmpty, setCartEmpty] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const {
          formattedTotalPrice,
          cartCount,
          clearCart,
          cartDetails,
          redirectToCheckout,
        } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])
  // useEffect(() => setResult(!cartCount), [cartCount])

  const [ state, dispatch ] = React.useContext(AddressContext)
  console.log(state)
  console.log(state.address)
  console.log('cartsumm.jsx')


  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    console.log(state.address)
    console.log('got hrere')


    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
      cartDetails
    )

    if (response.statusCode > 399) {
      console.error(response.message)
      setErrorMessage(response.message)
      setLoading(false)
      return
    }

    redirectToCheckout({ sessionId: response.id })
  }
  console.log(state)
  console.log(state.active)
  console.log('CS pre retren')
  console.log(cartEmpty)
  if (CWload('CartSummary.tsx')){  return (
      <form className='cart' onSubmit={handleCheckout}>
        {errorMessage ? (
          <p style={{ color: 'red' }}>Error: {errorMessage}</p>
        ) : null}
        {/* This is where we'll render our cart */}

        {/* Redirects the user to Stripe */}
        <div className='shop-sum-div'>
        <div className = "shop-info-div">
        <p className = 'shop-info' suppressHydrationWarning>
          <strong>Quantity: {cartCount}</strong>
        </p>
        <br/>
        <p className = 'shop-info' suppressHydrationWarning>
          <strong>Totals: {formattedTotalPrice}</strong>
        </p>
        </div>
        <div className = "shop-button-div">
        <button
          className="shop-button cart-button cart-button-top cart-style-background"
          type="submit"
          disabled={cartEmpty || !state.active }
        >
          Check Out (<FontAwesomeIcon icon={['fab', 'stripe']} />)
        </button>
        <button
          className="shop-button cart-button cart-button-mid cart-style-background"
          type="submit"
          disabled={true }
        >
          <s>Check Out (Crypto)</s>
        </button>
        <button
          className="shop-button clear-cart-background cart-button cart-button-bot cart-style-background"
          type="button"
          onClick={clearCart}
            disabled={cartEmpty || !state.active }
        >
          Clear Cart
        </button>
        </div>


        </div>
      </form>
    )}else{return(<h1>please connect wallet</h1>)}

}

export default CartSummary
