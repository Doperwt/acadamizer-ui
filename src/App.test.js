import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'
import Navigation from './components/UI/Navigation'
import Routes from './routes'

describe('<App />',() => {
  const app = shallow(<App />)

  it('wraps everything in a MuiThemeProvider tag',()=> {
    expect(app).toHaveTagName('MuiThemeProvider')
  })
})
