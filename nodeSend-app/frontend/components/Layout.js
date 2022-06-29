import React from 'react'
import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
        <title>NodeSend</title>
      </Head>

      <div className='bg-gray-100 min-h-screen'>
        <div className='container mx-auto'>
          <Header/>
          <main className='mt-20'>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}


export default Layout