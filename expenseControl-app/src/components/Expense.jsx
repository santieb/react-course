import { formatDate } from '../helpers'
import { 
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions 
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import savingIcon from '../img/icono_ahorro.svg'
import houseIcon from '../img/icono_casa.svg'
import subscriptionIcon from '../img/icono_suscripciones.svg'
import healthIcon from '../img/icono_salud.svg'
import foodIcon from '../img/icono_comida.svg'
import leisureIcon from '../img/icono_gastos.svg'
import variousExpensesIcon from '../img/icono_gastos.svg'

const diccionaryIcons = {
  Ahorro: savingIcon,
  Comida: foodIcon,
  Casa: houseIcon,
  'Gastos Varios': variousExpensesIcon,
  Ocio: leisureIcon,
  Salud: healthIcon,
  Suscripciones: subscriptionIcon
}

const Expense = ({ expense, setUpdateBudget, deleteExpense }) => {
  const { name, amount, category, id, date } = expense

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={()=> setUpdateBudget(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
    )

  const trailingActions = () => (
      <TrailingActions>
        <SwipeAction onClick={() => deleteExpense(id) } destructive='true'>
          Eliminar
        </SwipeAction>
      </TrailingActions>
    )

  return (
    <SwipeableList>
      <SwipeableListItem 
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionaryIcons[category]} alt='icon'/>

            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto"> Agregado el: {' '} 
                <span>{formatDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Expense