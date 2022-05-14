
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import Boxes from '../components/Boxes'

const BoxesPage: NextPage = () => {
  return (
    <Layout>
      <Boxes />
    </Layout>
  )
}

export default BoxesPage
