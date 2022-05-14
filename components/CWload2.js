import {

  useAddress,

} from '@thirdweb-dev/react';
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import Head from "next/head";


import { setDoc,doc,collection, getFirestore,updateDoc, arrayUnion } from '@firebase/firestore';
import { AddressContext } from "../contexts/Address"
import { useState } from 'react';
import { firestore } from '../components/firebase/client';

import React from "react"




export const CWload = (context) => {

    const address = useAddress();
    if (address) {
    const timestamp = Date.now().toString();
    console.log(timestamp)
    updateDoc(doc(firestore, "crypto_logins", String(address)), {
            [context]: arrayUnion(String(timestamp))  }).catch(()=>{ setDoc(doc(firestore, "crypto_logins", String(address)), {
            [context]: arrayUnion(String(timestamp))  });})


} else {}


  return address
};
