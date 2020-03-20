import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { status } from './../user'
import { logout } from '../state/actions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    boxSizing: 'border-box',
  },
  content: {
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
  },
  logoutButton: {
    marginLeft: 'auto'
  }
}))

export default function AppFrame ({children, title}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.user.status === status.LOGGED_IN)

  const handleLogoutClick = () => {
    dispatch(logout)
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h3" style={{fontSize: 32}}>{title}</Typography>
        {isLoggedIn && (
          <Button
            variant={'outlined'}
            className={classes.logoutButton}
            onClick={handleLogoutClick}
          >
            logOut
          </Button>
        )}
      </div>
      {/*<div className={classes.content}>*/}
      {children}
      {/*</div>*/}
    </div>
  )
}
