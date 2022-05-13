import { useContext } from 'react'
import WheatherContext from '../context/WheatherProvider'

const useWheather = () => {
  return useContext(WheatherContext)
}

export default useWheather