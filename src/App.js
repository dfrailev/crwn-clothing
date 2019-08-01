import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from  './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
/* Does it work with or wihtout .jsx? */

function App() {
  /* Switch shows just one of options, the first matches */
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
