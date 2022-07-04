import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, getAuth, updateProfile } from 'firebase/auth';
import 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import 'firebase/compat/firestore'
import firebaseConfig from './config'
import { getStorage } from '@firebase/storage';

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig)
    this.auth = getAuth(app)
    this.db = getFirestore(app)
    this.storage = getStorage(this.app)
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