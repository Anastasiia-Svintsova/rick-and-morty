import './App.css'
import firebaseApp from './common/firebaseApp'
import { FirebaseAppProvider } from 'reactfire'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './common/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { UIContextProvider } from './components/UIContext'
import { Root } from './components/Root'

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
