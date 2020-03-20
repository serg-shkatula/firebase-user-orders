import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import moment from 'moment'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  row: {
    position: 'relative'
  },
  rowLink: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
}))

export default function OrdersTable ({className, orders = {}}) {
  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Booking date</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(({__id, title, bookingDate, address = {}, customer = {}}) => (
            <TableRow key={__id}>
              <TableCell component="th" scope="row" className={classes.row}>
                <Link to={'/orders/' + __id.toString()} className={classes.rowLink}/>
                {title}
              </TableCell>
              <TableCell className={classes.row}>
                <Link to={'/orders/' + __id.toString()} className={classes.rowLink}/>
                {moment(bookingDate).format('DD MMMM YYYY')}
              </TableCell>
              <TableCell className={classes.row}>
                <Link to={'/orders/' + __id.toString()} className={classes.rowLink}/>
                {address.street}
              </TableCell>
              <TableCell className={classes.row}>
                <Link to={'/orders/' + __id.toString()} className={classes.rowLink}/>
                {customer.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
