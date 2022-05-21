import { useContext } from 'react'
import NewsContext from '../context/NewsProvider'

const useNews = () => useContext(NewsContext)

export default useNews