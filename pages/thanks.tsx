// @ts-nocheck
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import Head from "next/head";
import { CWload } from '../components/CWload';

import { setDoc,doc,collection, getFirestore } from '@firebase/firestore';

import { useState } from 'react';
import { firestore } from '../components/firebase/client';

import React from "react"

import {
  useNetwork,
  useAddress,
} from '@thirdweb-dev/react';


const addPurchasex = async (address) => {
      // alert(String(address))
};

const IndexPage: NextPage = () => {
  CWload('CWload')
  return (
    <Layout title="ArchiDAO">


    <h1>Thanks for purchasing!</h1>
    <h2>The ArchiDAO NFT will be distributed in the next 48 hours.</h2>
    <h3>If the address shown at top right is not correct, please hit us up in Discord!</h3>



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
