import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import moment from 'moment'
import React, { useState } from 'react'
import classNames from 'classnames'
import EditableField from './EditableField'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  }
}))

const checkValue = (values, key, originalValue) => {
  if (values[key] === originalValue) delete values[key]
  return values
}

export default function OrderDetailsTable ({className, data = {}, onEditConfirm}) {
  const {title, bookingDate, address = {}, customer = {}} = data

  const classes = useStyles()
  const isBeingUpdated = useSelector(state => state.order.isBeingUpdated)
  const [changedValues, setChangedValues] = useState({})

  const handleConfirmClick = () => {
    onEditConfirm(changedValues)
  }

  return (
    <TableContainer component={Paper} className={classNames([className, isBeingUpdated && classes.disabled])}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">Title</TableCell>
            <TableCell>
              <EditableField
                fullWidth
                defaultValue={changedValues.title || title}
                onChange={({value}) => setChangedValues(
                  checkValue({...changedValues, title: value}, 'title', title)
                )}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Booking Date</TableCell>
            <TableCell>
              <EditableField
                fullWidth
                type="date"
                defaultValue={moment(changedValues.bookingDate || bookingDate).format('YYYY-MM-DD')}
                onChange={({valueAsNumber}) => setChangedValues(
                  checkValue(
                    {...changedValues, bookingDate: valueAsNumber},
                    'bookingDate',
                    bookingDate
                  )
                )}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Street</TableCell>
            <TableCell>
              {address.street}
              <br/>
              {address.zip} {address.city}
              <br/>
              {address.country}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Name</TableCell>
            <TableCell>
              {customer.name}<br/>{customer.email}<br/>{customer.phone}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {Object.keys(changedValues).length > 0 && (
        <div className={classes.buttonsContainer}>
          <Button
            variant={'outlined'}
            color={'secondary'}
            onClick={() => setChangedValues({})}
          >
            Cancel
          </Button>
          <Button
            variant={'outlined'}
            color={'primary'}
            onClick={handleConfirmClick}
          >
            Confirm
          </Button>
        </div>
      )}
    </TableContainer>
  )
}
