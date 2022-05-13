import { useState, createContext } from 'react'
import { getYearDifference, calculateMarca, calculatePlan, formatMoney } from '../helpers'

const QuoterContext = createContext()

const QuoterProvider = ({ children }) => {
  const [error, setError] = useState('')
  const [res, setRes] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    marca: '',
    year: '',
    plan: ''
  }) 

  const handleChangeData = target => {
    setData({
      ...data,
      [target.name]: target.value
    })
  }

  const quoteInsurance = () => {
    setLoading(true)
    let res = 2000
    const yearDifference = getYearDifference(data.year)
    
    res -= ((yearDifference * 3) * res) / 100
    res *= calculateMarca(data.marca)
    res *= calculatePlan(data.plan)
    res = formatMoney(res)

    setTimeout(() => {
      setRes(res)
      setLoading(false)
    }, 3000)
  }

  return (
    <QuoterContext.Provider 
      value={{
        data,
        handleChangeData,
        error,
        setError,
        quoteInsurance,
        res,
        loading
      }}>
      {children}
    </QuoterContext.Provider>
  )
}

export {
  QuoterProvider
}

export default QuoterContext