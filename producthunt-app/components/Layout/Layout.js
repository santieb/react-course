import React from 'react'
import Header from '../Header'
import { Global, css } from '@emotion/react';
import Head from 'next/head'

const Layout = props => {
  return (
    <>
      <Global 
      styles={css`
        :root {
          --gray: #3d3d3d;
          --gray2: #6f6f6f;
          --orange: #da552d;
        }
        html {
          font-size: 62.5%;
          box-sizing: border-box;
        }
          *, *:before, *:after {
            box-sizing: inherit;
          }
        body {
          font-size: 1.6rem;
          line-height: 1.5;
          font-family: 'PT Sans', sans-serif;
        }
        h1, h2, h3 {
          margin: 0 0 2rem 0;
          line-height: 1.5;
        }
        h1, h2 {
          font-family: 'Roboto Slab', serif;
          font-weight: 700;
        }
        h3 {
          font-family: 'PT Sans', sans-serif;
        }
        ul {
          list-style: none;
          margin: 0 0 0 0;
          padding: 0;
        }
        a {
          text-decoration: none;
        }
      `}/>

      <Head>
        <html lang="en"/>
        <title>Product Hunt</title>
        <meta name="description" content="Product hunt"></meta>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="/static/css/app.css" rel="stylesheet"/>
      </Head>
      <Header/>

      <main>
        {props.children}
      </main>
    </>
  )
}

export default Layout