import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby';
import { shallow } from 'enzyme'
import CreateClassButton from '../components/classes/CreateClassButton'
import configureStore from 'redux-mock-store'
import initialState from '../initialState'
const mockStore = configureStore()
let store

describe('createClass',() => {
  store = mockStore(initialState)

  // const button = shallow(<CreateClassButton store={store} />).dive()
  // it('contains button Create class', () => {
  // expect(button).toContain('Create Class')
  // // expect(button).toHaveClassName('like')
  // })
})
