import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title="ArchiDAO">
      <ul className="card-list">
        <li>
          <Link href="/shop">
            <a className="card cart-style-background">
              <h2 className="bottom">Buy NFT</h2>
              <img src="/nft_.png" />
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage
