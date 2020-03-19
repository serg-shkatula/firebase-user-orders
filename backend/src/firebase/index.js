const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

export function initFirebase () {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as String),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
  })
}
