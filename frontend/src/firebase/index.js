import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

let db

export function initFirebase () {
  firebase.initializeApp(firebaseConfig)
  db = firebase.firestore()
}

export function onAuthStateChanged (observer) {
  return firebase.auth().onAuthStateChanged(observer)
}

export async function authenticateWithFirebase (email, password) {
  let res
  try {
    res = await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (e) {
    console.log('authenticateWithFirebase.authenticateWithFirebase, ~ Line 17: e >', e)
    throw e
  }
}

export async function signOutFromFirebase (email, password) {
  let res
  try {
    res = await firebase.auth().signOut()
  } catch (e) {
    console.log('authenticateWithFirebase.authenticateWithFirebase, ~ Line 17: e >', e)
    throw e
  }
}

export async function fetchOrders () {
  try {
    const collection = await db.collection('orders').get()
    const orders = []
    collection.forEach(doc => orders.push({...doc.data(), __id: doc.id}))
    return orders
  } catch (e) {
    console.log('authenticateWithFirebase.authenticateWithFirebase, ~ Line 27: e >', e)
    throw e
  }
}

export async function fetchOrderById (id) {
  try {
    let doc = await db.collection('orders').doc(id)
    doc = await doc.get()
    const order = doc.data()

    return order
  } catch (e) {
    console.log('fetchOrderById.fetchOrderById, ~ Line 46: e >', e)
    throw e
  }
}

export async function updateOrderById (id, payload) {
  try {
    const res = await db.collection('orders').doc(id).update(payload)
    return true
  } catch (e) {
    console.log('updateOrderById.updateOrderById, ~ Line 59: e >', e)
    throw e
  }
}
