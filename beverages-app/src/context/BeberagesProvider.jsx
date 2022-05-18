import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BeberagesContext = createContext()

const BeberagesProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([])
  const [modal, setModal] = useState(false)
  const [drinkId, setDrinkId] = useState(null)
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    const getRecipe = async () => {
      setLoading(true)
      if (!drinkId) return

      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
        const { data } = await axios(url)
        setRecipe(data.drinks[0])
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    getRecipe()
  }, [drinkId])

  const handleModal = () => setModal(!modal)

  const getBeberages = async ({ name, category }) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`
      
      const { data } = await axios(url)
      setDrinks(data.drinks)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDrinkId = id => setDrinkId(id)

  return (
    <BeberagesContext.Provider 
      value={{ 
        getBeberages,
        drinks, 
        handleModal,
        modal, 
        handleDrinkId,
        recipe,
        setRecipe,
        loading
      }}>
      {children}
    </BeberagesContext.Provider>
  )
}

export {
  BeberagesProvider
}

export default BeberagesContext