import React from 'react';
import Home from './pages/home';
import Reservation from './pages/reservation';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/reservation" component={Reservation} />
      </Switch>
    </Router>
  );
}

export default App;
