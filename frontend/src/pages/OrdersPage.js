import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import AppFrame from '../components/AppFrame'
import { updateOrders } from '../state/actions'
import OrdersTable from '../components/OrdersTable'

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 960,
  },
  content: {
    padding: theme.spacing(5),
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function OrdersPage () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userOrders = useSelector(state => state.user.orders)

  if (!userOrders) dispatch(updateOrders)

  return (
    <AppFrame title={'Orders'}>
      <div className={classes.content}>
        {userOrders ? (
          <OrdersTable orders={userOrders} className={classes.table}/>
        ) : (
          <Typography>Fetching...</Typography>
        )}
      </div>
    </AppFrame>
  )
}
