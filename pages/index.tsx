import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title="ArchiDAO">
      <ul className="card-list">
        <li>
          <Link href="/whitelist">
            <a className="card2 cart-style-background">
              <h2 className="bottom">Join the whitelist</h2>
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage
