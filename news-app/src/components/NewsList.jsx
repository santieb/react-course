import { Grid, Typography, Stack, Pagination } from '@mui/material'
import useNews from '../hooks/useNews'
import News from './News'

const NewsList = () => {
  const { news, totalNews, handleChangePage, page } = useNews()

  const totalPages = Math.ceil(totalNews / 20)

  return (
    <>
      <Typography textAlign="center" marginY={5} variant="3" component="h2">
        Últimas Noticias
      </Typography>

      <Grid container spacing={2}>
        {news.map(news => <News key={news.url} news={news}/>)}
      </Grid>
      <Stack spacing={2} direcion={'row'} justifyContent="center" alignItems='center' sx={{marginY:5}}>
        <Pagination 
          onChange={handleChangePage} 
          count={totalPages} 
          color="primary"
          page={page}/>
      </Stack>
    </>
  )
}

export default NewsList