import React, { createContext, useState } from 'react';

import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';
import { makeStyles } from '@mui/styles';

import theme from '../../common/theme';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
}
export interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
  anchorOrigin?: SnackbarOrigin;
}

const hoverMainColor = {
  transition: '1s',

  '&:hover': {
    color: theme.palette.primary.main,
  },
};

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
  flexGrow: {
    flexGrow: 1,
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  alignEnd: {
    display: 'flex',
    alignItems: 'flex-end',
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
    lineHeight: 1,
    ...hoverMainColor,
  },
  modalContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    height: 'fit-content',
  },
  signScreen: {
    overflow: 'hidden',
    minHeight: '100vh',
  },
  signScreenImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  },
  cardHover: {
    '&:hover': {
      boxShadow: `0px 8px 10px 1px rgba(33,33,33,.2)`,
      cursor: 'pointer',
    },
  },
});

export const UIContextProvider: React.FC<any> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  });
  const [userName, setUserName] = useState<string | null>(null);
  const handleClose = () =>
    setAlert({
      show: false,
    });
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
  );
};
