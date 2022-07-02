import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, updateProfile, signOut } from 'firebase/auth'
import 'firebase/compat/firestore'
import firebaseConfig from './config'

class Firebase {
  constructor() {
    initializeApp(firebaseConfig)
    this.auth = getAuth()
  }

  async register(name, email, password) {
    const newUser = await createUserWithEmailAndPassword(this.auth, email, password)
    
    return await updateProfile(newUser.user,{
      displayName: name
    })
  }

  async login(email, password) {
    return await signInWithEmailAndPassword(this.auth, email, password)
  }

  async logout() {
    return await this.auth.signOut()
  }
}

const firebase = new Firebase()

export default firebase