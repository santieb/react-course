import React from 'react'
import useWheather from "../hooks/useWheather"

const Result = () => {
  const { res } = useWheather()
  const { name, main } = res

  const kelvin = 273.15

  return (
    <div className="contenedor clima">
      <h2>El Clima de {name} es: </h2>
      <p>
        { parseInt(main.temp - kelvin)} <span>°C</span>
      </p>

      <div className="temp_min_max">
        <p>
          Temperatura Mínima: { parseInt(main.temp_min - kelvin)} <span>°C</span>
        </p>
        <p>
          Temperatura Máxima: { parseInt(main.temp_max - kelvin)} <span>°C</span>
        </p>
      </div>
    </div>
  )
}

export default Result