import firebase, { FirebaseContext } from '../firebase'
import useAuth from '../hooks/useAuth'

function MyApp({ Component, pageProps }) {
  const user = useAuth()
  console.log(user)
  return (
    <FirebaseContext.Provider 
      values={{
        firebase,
        user
      }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
    )
}

export default MyApp
