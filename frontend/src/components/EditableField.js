import React, { useState } from 'react'
import { TextField, Typography, IconButton } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'

export default function EditableField ({className, onChange, ...props}) {
  const [isBeingEdited, setIsBeingEdited] = useState(undefined)

  return (
    <div className={className} style={{display: 'flex', alignItems: 'center'}}>
      {isBeingEdited ? (
        <TextField
          {...props}
          autoFocus
          onBlur={({target}) => {
            setIsBeingEdited(false)
            onChange && onChange(target)
          }}
        />
      ) : (
        <>
          <Typography variant={'body2'}>{props.defaultValue || props.value}</Typography>
          <IconButton
            size={'small'}
            style={{marginLeft: 'auto'}}
            onClick={() => setIsBeingEdited(true)}
          >
            <Edit/>
          </IconButton>
        </>
      )}
    </div>
  )
}
