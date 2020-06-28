import React from 'react';
import {Switch, Route} from 'react-router-dom';


import './App.css';
import {HomePage} from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/shop' component={ShopPage}></Route>
      </Switch>
    </div>
  );
}

export default App;