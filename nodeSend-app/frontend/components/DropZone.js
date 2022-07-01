import Form from './Form'
import { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import appContext from '../context/app/appContext'
import authContext from '../context/auth/authContext'

const DropZone = () => {
  const AppContext = useContext(appContext)
  const { loading, showAlert, uploadFiles, createLink } = AppContext

  const AuthContext = useContext(authContext)
  const { authenticated } = AuthContext

  const onDropAccepted = useCallback( async acceptedFiles => {
    const formData = new FormData()
    formData.append('archive', acceptedFiles[0])

    uploadFiles(formData, acceptedFiles[0].path)
  }, [])

  const onDropRejected = () => {
    showAlert('No se pudo subir, el limite es un 1MB. Crea una cuenta para subir archivos mas grandes')
  }  

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles 
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 })

  const archives = acceptedFiles.map(archive => (
    <li className="bg-white flex-1 p-3 mb-4 shadows-lg rounded decorat list-none" key={archive.lastModified}>
      <p className='font-bold text-xl'>{archive.path}</p>
      <p className='text-sm text-gray-500'>
        { (archive.size / Math.pow(1024, 2)).toFixed(2) } MB
      </p>
    </li>
  ))

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      { acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">
            Archivos
          </h4>
          <ul>
            {archives}
          </ul>

          {
            authenticated ? <Form/> : ''
          }

          {loading ? <p className="my-10 text-center text-gray-600">Subiendo archivo...</p> :          
            <button onClick={() => createLink()} className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
              Crear enlace
            </button>
          }
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input className="bg-gray-100 px-4" {...getInputProps} />
          {isDragActive ? 
            <p className='text-2xl text-center text-gray-600'>Suelta el archivo</p> :
            <div className='text-center'>
            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aqui</p>
            <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
              Selecciona archivos para subir
            </button>
          </div>
          }
      </div>
      )}
    </div>
  )
}

export default DropZone