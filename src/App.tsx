import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { FirebaseAppProvider } from 'reactfire'

import firebaseApp from './common/firebaseApp'
import theme from './common/theme'
import { Root } from './components/Root'
import { UIContextProvider } from './components/UIContext'

function App() {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL || '/'}>
          <CssBaseline />
          <UIContextProvider>
            <Root />
          </UIContextProvider>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  )
}

export default App
