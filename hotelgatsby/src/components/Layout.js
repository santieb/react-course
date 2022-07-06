import React from "react"
import Header from "./header"
import Footer from "./footer"
import Helmet from "react-helmet"
import { Global, css } from "@emotion/react"
import useSeo from "../hooks/useSeo"

const Layout = ({ children }) => {
  const seo = useSeo()
  const {
    siteName,
    fallbackSeo: { description, title },
  } = seo

  return (
    <>
      <Global
        styles={css`
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          body {
            font-size: 18px;
            font-size: 1.8rem;
            line-height: 1.5;
            font-family: "PT Sans", sans-serif;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          h1,
          h2,
          h3 {
            margin: 0;
            line-height: 1.5;
          }
          h1,
          h2 {
            font-family: "Roboto", sans-serif;
          }
          h3 {
            font-family: "PT Sans", sans-serif;
          }
          user-select {
            margin: 0;
            padding: 0;
            list-style: none;
          }
        `}
      />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
          integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      {children}
      <Footer title={title} />
    </>
  )
}

export default Layout
