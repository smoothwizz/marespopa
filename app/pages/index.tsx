import type { NextPage } from 'next'
import Head from 'next/head'

import FunnelPage from '@/components/funnel/FunnelPage'
import PublicLayout from '@/components/layouts/PublicLayout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mares Popa - Looking for a website?</title>
        <meta
          name="description"
          content="One Page Funnel meticulously crafted to take your business to new heights beyond social media."
        />
      </Head>
      <PublicLayout>
        <FunnelPage />
      </PublicLayout>
    </>
  )
}

export default Home
