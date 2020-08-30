import React from 'react';
import Home from './pages/home';
import Reservation from './pages/reservation';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <Container>
      <NavBar></NavBar>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/reservation" component={Reservation} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
