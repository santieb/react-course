import axiosClient from './axios'

const tokenAuth = token => {
  if(token) return axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

  delete axiosClient.defaults.headers.common['Authorization']
}
export default tokenAuth