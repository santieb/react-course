import { useState,useEffect } from "react"
import firebase from "../firebase"
import { onAuthStateChanged } from 'firebase/auth';

function useAuth(){
    const [userAuth,setUserAuth] = useState(null)

    useEffect(() => {
        const onSuscribe = firebase.auth.onAuthStateChanged(user => {
            if(user){
                setUserAuth(user)
            } else {
                setUserAuth(null)
            }
        })

        return () => onSuscribe()
    }, [])

    return userAuth
}

export default useAuth