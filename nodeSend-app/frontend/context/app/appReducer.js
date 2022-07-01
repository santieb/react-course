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


export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT: {
      return {
        ...state,
        messageArchive: action.payload
      }
    }
    case RESET_ALERT: {
      return {
        ...state,
        messageArchive: null
      }
    }
    case UPLOAD_FILE_SUCESS: {
      return {
        ...state,
        name: action.payload.name,
        name_original: action.payload.name_original,
        loading: false
      }
    }
    case UPLOAD_FILE_ERROR: {
      return {
        ...state,
        messageArchive: action.payload,
        loading: false
      }
    }
    case UPLOAD_FILE: {
      return {
        ...state,
        loading: true
      }
    }
    case CREATE_LINK_SUCESS: {
      return {
        ...state,
        url: action.payload
      }
    }
    case RESET_STATE: {
      return {
        ...state,
        messageArchive: '',
        name: '',
        name_original: '',
        loading: false,
        dowloads: 1,
        password: '',
        autor: null,
        url: ''
      }
    }
    case ADD_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      }
    }
    case ADD_DOWNLOADS: {
      return {
        ...state,
        downloads: action.payload,
      }
    }
    default:
      return state
  }
}