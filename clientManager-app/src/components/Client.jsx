import { useNavigate } from "react-router-dom"

const Client = ({ client, handleDelete }) => {
  const navigate = useNavigate()

  const { id, name, email, phone, company, notes,} = client

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{name}</td>
      <td className="p-3">
        <p><span className="text-gray-800 uppercase font-bold">Email:</span>{email}</p>
        <p><span className="text-gray-800 uppercase font-bold">Tel:</span>{phone}</p>
      </td>
      <td className="p-3">{company}</td>
      <td className="p-3">
        <button 
          type="button"
          onClick={(() => navigate(`/clients/${id}`))}
          className="mt-3 bg-yellow-500 hover:bg-yellow-600 blovk w-full text-white p-2 upercase font-bold text-xs">Ver</button>
        <button 
          type="button"
          onClick={() => navigate(`/clients/update/${id}`)}
          className="mt-3 bg-blue-600 hover:bg-blue-800 blovk w-full text-white p-2 upercase font-bold text-xs">Editar</button>
        <button 
          type="button"
          onClick={() => handleDelete(id)}
          className="mt-3 bg-red-600 hover:bg-red-800 blovk w-full text-white p-2 upercase font-bold text-xs">Eliminar</button>
      </td>
    </tr>
  )
}

export default Client