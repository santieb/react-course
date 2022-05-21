import { Container, Grid, Typography } from '@mui/material'
import Form from './components/Form'
import NewsList from './components/NewsList'
import { NewsProvider } from './context/NewsProvider'

const App = () => {
  return (
    <NewsProvider>
      <Container>
        <header>
            <Typography align='center' marginY={5} component='h1' variant='h1'>
              Buscador de Noticias
            </Typography>
        </header>

        <Grid container direction='row' justifyContent='center' alignItems='center'>
          <Grid item md={6} xs={12}>
            <Form/>
          </Grid>
        </Grid>
        <NewsList/>
      </Container>
    </NewsProvider>
  )
}

export default App
