import * as React from "react"
import { css } from "@emotion/react"
import Nav from "./nav"
import styled from "@emotion/styled"
import { Link } from "gatsby"

const LinkHome = styled(Link)`
  color: white;
  text-align: center;
  text-decoration: none;
`

const Footer = ({ title }) => {
  const year = new Date().getFullYear
  return (
    <>
      <footer
        css={css`
          background-color: rgba(44, 62, 80);
          margin-top: 5rem;
          padding: 1rem;
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            margin: 0 auto;

            @media (min-width: 768px) {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}
        >
          <Nav />
          <LinkHome to="/">
            <h1>Hotel Gatsby</h1>
          </LinkHome>
        </div>
      </footer>
      <p
        css={css`
          text-align: center;
          color: #fff;
          background-color: rgb(33, 44, 55);
          margin: 0;
          padding: 1rem;
        `}
      >
        {title}. Todos los derechos reservados {year} &copy;
      </p>
    </>
  )
}

export default Footer
