import Guitar from './Guitar'
import styles from '../styles/List.module.css'

const List = ({ guitars }) => {
  return (
    <div className={styles.list}>
      { guitars.map(guitar => (
      <Guitar
        key={guitar.url}
        guitar={guitar}/>)) }
    </div>
  )
}

export default List