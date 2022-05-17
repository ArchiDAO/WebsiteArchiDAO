import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const items = [
  {title: 'Workshop Priority', data: 'Get priority seats to upcoming six ArchiDAO workshops. We\'ve created educational content before!', link: true},
  {title: 'Scholarship', data: 'Help to make the difference in the democratisation of Architecture Technology.'},
  {title: 'Exhibition', data: 'Opportunity to show your work in ArchiDAO Gallery and Exhibitions.'},
  {title: 'Fund Tutors', data: 'Sponsor instructors for next six workshops and make them accessible to holders for free.'},
  {title: 'Bonus Hours', data: 'Bonus after hours with tutors for the six upcoming workshops.'},
  {title: 'Voting', data: 'Eligible to vote for future governance of educational initiatives.'},
]

const IndexPage: NextPage = () => {var i = 0
  return (
    <Layout title="ArchiDAO">
<div className="faq-div">
    <h1>Why is your NFT not just a hype?</h1>
<p>ArchiDAO presents our wearable NFT! The wearable will be available for use in Decentraland.<br/>
Cherry on the top, our NFT has six additional utilities.
</p>
  <h1>  What are the six utilities?</h1>
      <ul className="faq-list">

      {items.map((item) => {i += 1; if (item.link == true) {
        return(
          <li>
              <div className="faq-item cart-style-background">
                <h2>{i}. {item.title}</h2>
                <p>{item.data}</p>
                <a className="faq-a" href="https://youtube.com/channel/UCm08iRIcqpqzgIcva7gUFHg">Checkout our Youtube</a>
              </div>
          </li>
      )} else {return(
        <li>
            <div className="faq-item cart-style-background">
              <h2>{i}. {item.title}</h2>
              <p>{item.data}</p>
            </div>
        </li>
      )}
    })}
      </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
