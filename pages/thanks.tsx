// @ts-nocheck
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import Head from "next/head";
import { CWload } from '../components/CWload';

import { setDoc,doc,collection, getFirestore,updateDoc, arrayUnion } from '@firebase/firestore';
import { firestore } from '../components/firebase/client';

import { useState } from 'react';
import { AddressContext } from "../contexts/Address"


import React from "react"

import {
  useNetwork,
  useAddress,
} from '@thirdweb-dev/react';


const addPurchasex = (address) => {
      // alert(String(address))
      const [ state, dispatch ] = React.useContext(AddressContext)
      const timestamp = Date.now().toString();
      if (address) {updateDoc(doc(firestore, "purchase_success", String(timestamp)), {
              address: arrayUnion(String(address))  }).catch(()=>{ setDoc(doc(firestore, "purchase_success", String(timestamp)), {
              address: (String(address)) });})}
};

const IndexPage: NextPage = () => {
  let address_ = CWload('purchase-thanks')
  addPurchasex(address_)
  return (
    <Layout title="ArchiDAO">
      <ul className="card-list">
        <li>
        <Link href="/">
            <a className="whitelist-div cart-style-background">
          <h2>Thanks for purchasing!</h2><br/>
          <p>The ArchiDAO NFT will be distributed in the next 48 hours.</p>
                      </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )

}

export default IndexPage


// <button
//   className="cart-style-background"
//   onClick={() => addPurchasex()}
// >
//
//   <h2>Click to pre-Mint</h2>
// </button>
