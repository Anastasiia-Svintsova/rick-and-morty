import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store/store'

test('renders', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
