import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
// import './setupTests.js'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Index />, div)
})

it('should save to localStorage', () => {
  const KEY = 'foo', VALUE = 'bar';
  dispatch(action.update(KEY, VALUE));
  expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
  expect(localStorage.__STORE__[KEY]).toBe(VALUE);
  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
});
