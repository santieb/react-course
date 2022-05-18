import useBeberages from '../hooks/useBeberages'
import { Modal, Image } from  'react-bootstrap'

const DrinkModal = () => {
  const { modal, handleModal, recipe, loading } = useBeberages()

  const getIngredients = () => {
    let ingredients = []

    for(let i = 1; i < 16; i++) {
      if(recipe[`strIngredient${i}`]) {
        ingredients.push(
          <li key={recipe[`strIngredient${i}`]}>{recipe[`strIngredient${i}`]} {recipe[`strMeasure${i}`]}</li>
        )
      }
    }
    return ingredients
  }

  return (
    !loading && (
      <Modal show={modal} onHide={handleModal}>
        <Image src={recipe.strDrinkThumb} alt={`${recipe.strDrink} image`}/>
        <Modal.Header>
          <Modal.Title>{recipe.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instrucciones</h2>
              {recipe.strInstructions}
            <h2>Ingredientes y Cantidades</h2>
            {getIngredients()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}

export default DrinkModal