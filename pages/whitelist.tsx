// @ts-nocheck
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import Head from "next/head";
import { CWload } from '../components/CWload';
import { useRouter } from 'next/router'
import { useState } from 'react';
import React from "react"

import { setDoc,doc,collection, getFirestore,updateDoc, arrayUnion } from '@firebase/firestore';
import { firestore } from '../components/firebase/client';


import {
  useNetwork,
  useAddress,
} from '@thirdweb-dev/react';


const addPurchasex = async (address) => {
      // alert(String(address))
};

const IndexPage: NextPage = () => {
  const [values, setValues] = useState({
  	email: '',
  });
  const handleEmailInputChange = (event) => {
  	event.persist();
    values.email = event.target.value
  	setValues((values) => ({
  		...values,
  		email: event.target.value,
  	}));
  };


  var address = CWload('whitelist')
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const timestamp = Date.now().toString();
    console.log(address)
    console.log(timestamp)
    await updateDoc(doc(firestore, "whitelist", String(address)), {
            email: (String(values.email))  }).catch(()=>{ setDoc(doc(firestore, "whitelist", String(address)), {
            email: (String(values.email)) });})
    await updateDoc(doc(firestore, "crypto_logins", String(address)), {
            whitelist: arrayUnion(String(timestamp)), email: arrayUnion(String(values.email))  }).catch(()=>{ setDoc(doc(firestore, "crypto_logins", String(address)), {
            whitelist: (String(timestamp)), email: (String(values.email)) });})



    window.location.href = "/whitelist-thanks";
  // Send the form data to our forms API on Vercel and get a response.
}
if (address) {  return (
    <Layout title="ArchiDAO">
    <div className="whitelist-div">
    <form className="whitelist-form" onSubmit={handleSubmit}>
      <input type="text" className="whitelist-input" id="email" placeholder="email" name="email" value={values.email} onChange={handleEmailInputChange} required />
      <button className="whitelist-submit" type="submit">send</button>
    </form>
    </div>
    </Layout>
  )} else
{  return (
    <Layout title="ArchiDAO">
    <div className="whitelist-div">
      <h1>Please connect wallet to whitelist</h1>
    </div>
    </Layout>
  )}

}



export default IndexPage


// <button
//   className="cart-style-background"
//   onClick={() => addPurchasex()}
// >
//
//   <h2>Click to pre-Mint</h2>
// </button>
