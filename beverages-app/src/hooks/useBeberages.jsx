import { useContext } from 'react'
import BeberagesContext from '../context/BeberagesProvider'

const useBeberages = () => useContext(BeberagesContext)

export default useBeberages
