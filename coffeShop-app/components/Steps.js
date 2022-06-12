import { useRouter } from 'next/router'

const steps = [
  { step: 1, name: 'Menu', url: '/'},
  { step: 2, name: 'Resumen', url: '/resume'},
  { step: 3, name: 'Datos y Total', url: '/total'}
]

const Steps = () => {

  const router = useRouter()

  const calculateProgress = () => {
    let value
    if (router.pathname === '/') value = 2
    if (router.pathname === '/resume') value = 50
    if (router.pathname === '/total') value = 100
    return value
  }

  return (
    <>
      <div className='flex justify-between mb-5'>
        {steps.map(step => 
        <button
          onClick={() => {
            router.push(step.url)
          }}
          className="text-2xl font-bold"
          key={step.step}>
          {step.name}
        </button>)}
      </div>

      <div className="bg-gray-100 mb-10">
        <div style={{ width: `${calculateProgress()}%`}} className="rounded-full bg-amber-500 text-xs leading-nonse h-2 text-center text-white w-10">

        </div>
      </div>
    </>
  )
}

export default Steps