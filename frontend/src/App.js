import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { user } from './state/reducers'
import thunk from 'redux-thunk'
import AuthPage from './pages/AuthPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import PageNotFound from './pages/PageNotFound'
import { Provider } from 'react-redux'
import { initFirebase } from './firebase'
import { status } from './user'

const store = createStore(
  combineReducers({user}),
  {user: {}},
  applyMiddleware(thunk),
)

initFirebase()

function App () {
  const checkUserLoggedIn = () => store.getState().user.status === status.LOGGED_IN

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {() => (checkUserLoggedIn() ? <Redirect to={'/orders'}/> : <Redirect to={'/auth'}/>)}
          </Route>
          <Route path="/auth">
            {() => (!checkUserLoggedIn() ? <AuthPage/> : <Redirect to={'/'}/>)}
          </Route>
          <Route path="/orders/:id">
            {() => (checkUserLoggedIn() ? <OrderDetailsPage/> : <Redirect to={'/'}/>)}
          </Route>
          <Route path="/orders">
            {() => (checkUserLoggedIn() ? <OrdersPage/> : <Redirect to={'/'}/>)}
          </Route>
          <Route><PageNotFound/></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
