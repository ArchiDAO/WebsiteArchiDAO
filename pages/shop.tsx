import { NextPage } from 'next'
import Layout from '../components/Layout'
import React from "react"
import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'
import { AddressContext } from "../contexts/Address"
const DonatePage: NextPage = () => {

  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">

      <div className="nft-container">
        <Cart>
          <Products />
          <CartSummary />
        </Cart>
      </div>
    </Layout>
  )
}

export default DonatePage
