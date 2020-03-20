import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { order, user } from './state/reducers'
import thunk from 'redux-thunk'
import AuthPage from './pages/AuthPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import PageNotFound from './pages/PageNotFound'
import { Provider } from 'react-redux'
import { initFirebase, onAuthStateChanged } from './firebase'
import { status } from './user'
import { setUserStatus } from './state/actions'
import AppRouter from './AppRouter'

const store = createStore(
  combineReducers({user, order}),
  {user: {status: undefined}, order: {}},
  applyMiddleware(thunk),
)

initFirebase()
onAuthStateChanged(user => {
  store.dispatch(setUserStatus(user ? status.LOGGED_IN : status.LOGGED_OUT))
})

function App () {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
