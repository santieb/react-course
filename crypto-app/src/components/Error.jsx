import styled from '@emotion/styled'

const Content = styled.div`
  background-color: #b7322c;
  color: #fff;
  padding: 15px;
  font-size: 22px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
`

function Error({ children }) {
  return (
    <Content>{children}</Content>
  )
}

export default Error