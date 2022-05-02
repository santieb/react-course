import { useContext } from 'react'
import LettersContext  from '../context/LettersProvider'

const useLetters = () => useContext(LettersContext)

export default useLetters