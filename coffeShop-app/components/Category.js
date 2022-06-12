import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Category = ({ category }) => {
  const { selectedCategory, handleClickCategory } = useQuiosco()

  const { name, icon, id } = category

  return (
    <div className={`${selectedCategory?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border hover:bg-amber-400`}>
      <Image className='mr-5' width={100} height={100} src={`/assets/img/icono_${icon}.svg`} alt={name}/>
      <button onClick={() => handleClickCategory(id)} type='button' className='text-2xl font-bold hover:cursor-pointer'>
        {name}
      </button>
    </div>
  )
}

export default Category