import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {fromJS} from 'immutable';

const store = createStore(reducer, fromJS({
  grid: [
    [{color: 'black'},{color: 'black'},{color: 'black'}],
    [{color: 'black'},{color: 'black'},{color: 'black'}],
    [{color: 'black'},{color: 'black'},{color: 'black'}]
  ],
  cellSize: 10,
  columns: 3,
  rows: 3,
  padding: 0.1
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
