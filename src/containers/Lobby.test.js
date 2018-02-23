import React from 'react';
import ReactDOM from 'react-dom';
import Lobby from './Lobby';
import { shallow } from 'enzyme'
import CreateClassButton from '../components/classes/CreateClassButton'

describe('createClass',() => {
  const button = shallow(<CreateClassButton />)
  it('is wrapped in a paragraph with class "like"', () => {
  expect(button).toHaveTagName('Create Class')
  expect(button).toHaveClassName('like')
})
})
