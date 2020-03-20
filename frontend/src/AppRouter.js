import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrdersPage from './pages/OrdersPage'
import PageNotFound from './pages/PageNotFound'
import React from 'react'
import { status } from './user'
import { useSelector } from 'react-redux'

export default function AppRouter () {
  const userIsLoggedIn = useSelector(state => (state.user.status === status.LOGGED_IN))

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {userIsLoggedIn ? <Redirect to={'/orders'}/> : <Redirect to={'/auth'}/>}
        </Route>
        <Route path="/auth">
          {userIsLoggedIn ? <Redirect to={'/'}/> : <AuthPage/>}
        </Route>
        <Route path="/orders/:id">
          {({match: {params}}) => (
            userIsLoggedIn ? <OrderDetailsPage params={params}/> : <AuthPage/>
          )}
        </Route>
        <Route path="/orders">
          {userIsLoggedIn ? <OrdersPage/> : <AuthPage/>}
        </Route>
        <Route><PageNotFound/></Route>
      </Switch>
    </BrowserRouter>
  )
}
