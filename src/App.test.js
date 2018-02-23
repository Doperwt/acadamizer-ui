import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'
import Navigation from './components/UI/Navigation'
import Routes from './routes'
import configureStore from 'redux-mock-store'
import initialState from './initialState'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'react-router-redux'
import { history } from './store'

const mockStore = configureStore()
let store

describe('<App />',() => {
  const app = shallow(<App />)

  it('wraps everything in a MuiThemeProvider tag',()=> {
    expect(app).toHaveTagName('MuiThemeProvider')
  })
})

it('renders without crashing', () => {
  store = mockStore(initialState)
  const div = document.createElement('div')
  ReactDOM.render(<Provider store={store}><Router history={history}><App/></Router></Provider>, div)
})
