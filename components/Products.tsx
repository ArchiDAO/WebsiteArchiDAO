import products from '../data/products'
import { formatCurrencyString } from 'use-shopping-cart'
import { useShoppingCart } from 'use-shopping-cart/react'
import { CWload } from '../components/CWload';
// import {FontAwesomeIcon} from fortawesome;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
// library.add(fab, faCheckSquare, faCoffee)
// // this babel macros brings in a module called moduled and next doesnt like that (which makes sense because using a built in name is a bad idea)
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { useState, useEffect, useCallback } from 'react'
let  addOn = 0
const Products = () => {
  const { addItem, removeItem, incrementItem, decrementItem,cartCount } = useShoppingCart()
  const [minusOn, setMinus] = useState(false)
  const [plusOn, setPlus] = useState(true)
  const [cartFull, setFull] = useState(false)
  const address = CWload('Products.tsx')

  // try{decrementItem(product.id)}
  const minusAction = (product) => {

     if (cartCount > 1) {
      decrementItem(product.id)
    } else {  setMinus(false)}
     checkButtons(cartCount)

  }

  const plusAction = (product) => {
    console.log(product)
    if (cartCount < 3) {
    addItem(product)
    } else { setPlus(false) }
    checkButtons(cartCount)
  }

  const checkButtons = (count) => {
    console.log(count)
    if (count > 1 ) {setMinus(true)}
    if (count < 3 ) {setPlus(true)}
  }

  useEffect(() => {
  // Update the document title using the browser API
  if (cartFull == false)
      {  products.map((product) => (addItem(product)))
        setFull(true)}
});
  if (!address) {
    return (
    <section className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} className='nftimage' alt={product.name} />
            <h2>{product.name}</h2>
            <p className="price">
              {formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}
            </p>
          </div>
        ))}
      </section>)
  } else{
  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} className='nftimage' alt={product.name} />
          <h1>{product.name}</h1>
          <h2 className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </h2>
          <button
            className="shop-button change-count-button  subtract-button cart-style-background"
            onClick={() => minusAction(product)}
            disabled={!address || !(cartCount > 1)}
          >
            -
          </button>
          <button
            className="shop-button  change-count-button add-button cart-style-background"
            onClick={() => {
              console.log(product)
              addItem(product)
            }}
            disabled={!address || !(cartCount < 1) }
          >
            +
          </button>
        </div>
      ))}
    </section>
  )}
}

export default Products
