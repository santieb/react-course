import { useContext } from 'react'
import CategoryContext from '../context/CategoryProvider'

const useCategory = () => useContext(CategoryContext)

export default useCategory
