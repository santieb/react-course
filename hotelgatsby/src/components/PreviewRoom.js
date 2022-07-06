import React from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const Button = styled(Link)`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(44, 62, 80.85);
  width: 100%;
  color: white;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
`

const PreviewRoom = ({ room }) => {
  return (
    <div
      css={css`
        border: 1px solid #e1e1e1;
        margin-bottom: 2rem;
      `}
    >
      <GatsbyImage image={room.img.gatsbyImageData} alt="aboutUs" />
      <div
        css={css`
          padding: 3rem;
        `}
      >
        <h3
          css={css`
            font-size: 3rem;
          `}
        >
          {room.title}
        </h3>
        <p>{room.content}</p>
        <Button to={`/${room.slug}`}>Ver Habitacion</Button>
      </div>
    </div>
  )
}

export default PreviewRoom
