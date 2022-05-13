import { useMemo } from "react"
import useQuoter from "../hooks/useQuoter"
import { MARCAS, PLANS } from '../constants'

const Result = () => {
  const { res, data } = useQuoter()
  const { marca, plan, year } = data

  const [nameMarca] = useMemo(() =>
    MARCAS.filter(m => m.id === Number(marca))
  , [res])
  
  const [namePlan] = useMemo(() =>
    PLANS.filter(p => p.id === Number(plan))
  , [res])

  if (res === 0) return null

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
      <p className="my-2">
        <span className="font-bold">Marca: </span>{nameMarca.name}
      </p>
      <p className="my-2">
        <span className="font-bold">Plan: </span>{namePlan.name}
      </p>
      <p className="my-2">
        <span className="font-bold">Año del auto: </span>{year}
      </p>

      <p className="my-2 text-2xl">
        <span className="font-bold">Total Cotización: </span>{res}
      </p>
    </div>
  )
}

export default Result