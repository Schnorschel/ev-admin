import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import ViewAllEvs from './pages/ViewAllEvs'
import ViewAllEvTypes from './pages/ViewAllEvTypes'
import ViewEv from './components/ViewEv'
import NewEv from './pages/NewEv'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <header>
        <h1>A directory of Electric Cars</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Go Home</Link>
            </li>
            <li>
              <Link to="/ViewAllEvs">View All EVs</Link>
            </li>
            <li>
              <Link to="/ViewAllEvTypes">View All Ev Types</Link>
            </li>
            <li>
              <Link to="/NewEv">Create Ev</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/ViewAllEvs" component={ViewAllEvs}></Route>
        <Route exact path="/ViewAllEvTypes" component={ViewAllEvTypes}></Route>
        <Route exact path="/NewEv" component={NewEv}></Route>
        <Route exact path="/ViewEv/:id" component={ViewEv}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
