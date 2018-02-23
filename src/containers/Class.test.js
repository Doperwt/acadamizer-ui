import React from 'react';
import ReactDOM from 'react-dom';
import Class from './Class';
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import initialState from '../initialState'
const mockStore = configureStore()
let store,params,match

describe('show Class',() => {
  store = mockStore({})
  params = {classId:'5a8fcf28d02afe1da544ce1e'}
  match = { params}
  const group = shallow(<Class store={store} match={match}/>)
  it('displays class name', () => {
  expect(group).toContain('batch-1')
  // expect(button).toHaveClassName('like')
  })
})
