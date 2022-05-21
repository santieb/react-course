import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const NewsContext = createContext()

const NewsProvider = ({ children }) => {
  const [category, setCategory] = useState('general')
  const [news, setNews] = useState([])
  const [page, setPage] = useState(1)
  const [totalNews, setTotalNews] = useState(0)

  useEffect(() =>{
    const getData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`
      const { data } = await axios(url)
      setNews(data.articles)
      setTotalNews(data.totalResults)
      setPage(1)
    }
    getData()
  }, [category])

  useEffect(() =>{
    const getData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=ar&page=${page}&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`
      const { data } = await axios(url)
      setNews(data.articles)
      setTotalNews(data.totalResults)
    }
    getData()
  }, [page])

  const handleChangePage = (e, valor) => {
    setPage(valor)
  }

  const handleChangeCategory = ({ target }) => setCategory(target.value)

  return (
    <NewsContext.Provider 
      value={{ 
        category,
        handleChangeCategory,
        news,
        totalNews,
        handleChangePage,
        page
      }}>
      {children}
    </NewsContext.Provider>
  )
}

export { NewsProvider }

export default NewsContext