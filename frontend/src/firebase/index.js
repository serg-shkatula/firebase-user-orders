import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

let db

export function initFirebase () {
  firebase.initializeApp(firebaseConfig)
  db = firebase.firestore()
}

export async function authenticateWithFirebase (email, password) {
  let res
  try {
    res = await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (e) {
    console.log('authenticateWithFirebase.authenticateWithFirebase, ~ Line 17: e >', e)
    throw e
  }

  let doc
  try {
    doc = db.collection('users').doc(res.user.uid)
    doc = await doc.get()
    const data = doc.data()
    console.log('authenticateWithFirebase.authenticateWithFirebase, ~ Line 26: data >', data)
  }catch (e) {
    console.log('authenticateWithFirebase.authenticateWithFirebase, ~ Line 27: e >', e)
  }

}
