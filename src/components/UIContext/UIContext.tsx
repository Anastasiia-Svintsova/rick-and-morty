import React, { createContext, useState } from 'react'
import { Alert, AlertColor } from '@mui/material'
import { Snackbar, SnackbarOrigin } from '@mui/material'
import { makeStyles } from '@mui/styles'
import theme from '../../common/theme'

export const UIContext = createContext<UIContextProps>({} as UIContextProps)

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>
  setUserName: React.Dispatch<React.SetStateAction<string | null>>
  userName: string | null
}
export interface AlertProps {
  show: boolean
  severity?: AlertColor
  message?: string
  anchorOrigin?: SnackbarOrigin
}

const hoverMainColor = {
  transition: '1s',

  '&:hover': {
    color: theme.palette.primary.main,
  },
}

export const useStyles = makeStyles({
  root: {
    padding: '20px 80px',

    [theme.breakpoints.down('md')]: {
      padding: '20px 50px',
    },

    [theme.breakpoints.down('sm')]: {
      padding: '20px 24px',
    },
  },
  space: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  fullHeight: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  linkStyle: {
    textDecoration: 'none',
    color: theme.palette.light.main,
    ...hoverMainColor,
  },
  modalContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    height: 'fit-content',
  },
})

export const UIContextProvider: React.FC<any> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  })
  const [userName, setUserName] = useState<string | null>(null)
  const handleClose = () =>
    setAlert({
      show: false,
    })
  return (
    <UIContext.Provider value={{ userName, setAlert, setUserName }}>
      {children}
      <Snackbar
        open={alert.show}
        anchorOrigin={alert.anchorOrigin}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert elevation={6} variant='filled' severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  )
}
