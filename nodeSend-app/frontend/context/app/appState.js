import { useReducer } from 'react'
import appContext from './appContext'
import appReducer from './appReducer'
import clientAxios from '../../config/axios'
import { 
  SHOW_ALERT,
  RESET_ALERT,
  UPLOAD_FILE_SUCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE,
  CREATE_LINK_SUCESS,
  CREATE_LINK_ERROR,
  RESET_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOADS
} from '../../types'

const AppState = ({children}) => {
  const initialState = {
    messageArchive: '',
    name: '',
    name_original: '',
    loading: false,
    downloads: 1,
    password: '',
    autor: null,
    url: ''
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const showAlert = msg => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg
    })

    setTimeout(() => { 
      dispatch({
        type: RESET_ALERT,
      })
    }, 3000)
  }

  const uploadFiles = async (formData, fileName) => {
    dispatch({
      type: UPLOAD_FILE
    })

    try {
      const res = await clientAxios.post('/api/archives', formData)

      dispatch({
        type: UPLOAD_FILE_SUCESS,
        payload: {
          name: res.data.archive,
          name_original: fileName
        }
      })
    } catch (err) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: err.res.data.msg
      })
    }
  }

  const createLink = async () => {
    const data = {
      name: state.name,
      name_original: state.name_original,
      downloads: state.downloads,
      password: state.password,
      autor: state.autor,
    }

    try {
      const res = await clientAxios.post('/api/links', data)
      
      dispatch({
        type: CREATE_LINK_SUCESS,
        payload: res.data.msg
      })
    } catch (err) {
      console.log(err)
    }
  }

  const resetState = async () => {
    dispatch({
      type: RESET_STATE
    })
  }

  const addPassword = password => {
    dispatch({
      type: ADD_PASSWORD,
      payload: password
    })
  }

  const addDownloads = downloads  => {
    dispatch({
      type: ADD_DOWNLOADS,
      payload: downloads
    })
  }

  return (
    <appContext.Provider
      value={{
        messageArchive: state.messageArchive,
        name: state.name,
        name_original: state.name_original,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        autor: state.autor,
        url: state.url,
        showAlert,
        uploadFiles,
        createLink,
        resetState,
        addPassword,
        addDownloads
      }}>
      {children}
    </appContext.Provider>
  )
}

export default AppState