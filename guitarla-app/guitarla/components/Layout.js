import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children, page, guitar=null}) => {
  return (
    <div>
      <Head>
        <title>GuitarLA - {page}</title>
        <meta name="description" content="Sitio web de venta de guitarras"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap" rel="stylesheet"></link>
      </Head>
      <Header guitar={guitar}/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout