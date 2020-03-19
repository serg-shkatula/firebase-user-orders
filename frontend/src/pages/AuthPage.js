import React, { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { login } from '../state/actions'
import { status } from '../user'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
  },
  paper: {
    padding: theme.spacing(4),
    width: 240,
    maxWidth: '100%',
    '&>*:not(:last-child)': {
      // marginBottom: theme.spacing(1)
    },
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: `${theme.spacing(2)}px !important`
  },
  button: {
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  }
}))

export default function AuthPage () {
  const dispatch = useDispatch()
  const userStatus = useSelector(state => state.user.status)
  const classes = useStyles()
  const [passwordElement, setPasswordElement] = useState(undefined)
  const [emailElement, setEmailElement] = useState(undefined)
  const [errors, setErrors] = useState({})

  if (userStatus === status.LOGGED_IN) return <Redirect to={'/'}/>

  const validateEmail = () => {
    if (!emailElement || emailElement.value === '') return 'Cannot be empty'
    if (!emailElement.checkValidity()) return 'Email is invalid'
  }
  const validatePassword = () => {
    if (!passwordElement || passwordElement.value === '') return 'Cannot be empty'
  }
  const handleLoginClick = () => {
    const errors = {
      email: validateEmail(),
      password: validatePassword(),
    }
    if (errors.email || errors.password) {
      setErrors(errors)
      return false
    }
    dispatch(login({email: emailElement.value, password: passwordElement.value}))
  }

  return (
    <div className={classes.root}>
      <Paper
        className={classNames([
          classes.paper,
          userStatus === status.LOGGING_IN && classes.disabled
        ])}
      >
        <Typography variant={'h5'} className={classes.title}>Firebase Login</Typography>
        <TextField
          type={'email'}
          required
          label="Email"
          error={!!errors.email}
          helperText={errors.email || ' '}
          fullWidth
          onChange={({target}) => setEmailElement(target)}
          onFocus={() => setErrors({...errors, email: undefined})}
        />
        <TextField
          type={'password'}
          required
          label="Password"
          error={!!errors.password}
          helperText={errors.password || ' '}
          fullWidth
          onChange={({target}) => setPasswordElement(target)}
          onFocus={() => setErrors({...errors, password: undefined})}
        />
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </Paper>
    </div>
  )
}
