import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Cookies from './Cookies';
import NotFound from './NotFound';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App dispatch={store.dispatch} />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </Provider>
);

export default Root;
