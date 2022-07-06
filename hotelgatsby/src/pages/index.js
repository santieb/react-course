import * as React from "react"
import Layout from "../components/Layout"
import HoltelImage from "../components/hotelImage"
import ContentIndex from "../components/contentIndex"
import useRooms from "../hooks/useRooms"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import PreviewRoom from "../components/PreviewRoom"

const RoomList = styled.ul`
  max-width: 1200px;
  width: 95%;
  margin: 4rem auto 0 auto;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 3rem;
  }
`

const IndexPage = () => {
  const rooms = useRooms()

  console.log(rooms)
  return (
    <Layout>
      <HoltelImage />
      <ContentIndex />

      <h2
        css={css`
          text-align: center;
          margin-top: 5rem;
          font-size: 3rem;
        `}
      >
        Nuestras Habitaciones
      </h2>

      <RoomList>
        {rooms.map(room => (
          <PreviewRoom key={room.id} room={room} />
        ))}
      </RoomList>
    </Layout>
  )
}

export default IndexPage
