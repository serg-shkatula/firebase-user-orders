import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import AppFrame from '../components/AppFrame'
import { fetchOrderById } from '../firebase'
import OrderDetailsTable from '../components/OrderDetailsTable'
import { amendSingleOrder } from '../state/actions'
import { ORDER_SET_IS_BEING_UPDATED } from '../state/actionTypes'
import api from '../api'
import { order } from '../state/reducers'

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 720,
  },
  content: {
    padding: theme.spacing(5),
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function OrderDetailsPage ({params = {}}) {
  const {id} = params

  const classes = useStyles()
  const dispatch = useDispatch()
  const [orderData, setOrderData] = useState(undefined)
  const [updatedKey, setUpdatedKey] = useState('123')

  useEffect(()=>{
    setUpdatedKey(Math.random().toString())
  }, [orderData])

  if (!orderData) {
    (async () => {
      try {
        const data = await fetchOrderById(id)
        setOrderData(data)
      } catch (e) {
        //
      }
    })()
  }

  const handleEditConfirm = async (values) => {
    dispatch({type: ORDER_SET_IS_BEING_UPDATED, isBeingUpdated: true})

    try {
      await api.updateOrder(id, values)
      const data = await fetchOrderById(id)
      setOrderData(data)
    } catch (e) {
      console.log('login., ~ Line 12: e >', e)
    }

    dispatch({type: ORDER_SET_IS_BEING_UPDATED, isBeingUpdated: undefined})
  }

  return (
    <AppFrame title={'Order Details'}>
      <div className={classes.content}>
        {orderData ? (
          <OrderDetailsTable key={updatedKey} data={orderData} className={classes.table} onEditConfirm={handleEditConfirm}/>
        ) : (
          <Typography>Fetching...</Typography>
        )}
      </div>
    </AppFrame>
  )
}
