import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import ViewAllEvs from './pages/ViewAllEvs'
import ViewAllEvTypes from './pages/ViewAllEvTypes'
import ViewEv from './components/ViewEv'
import ViewEvType from './components/ViewEvType'
import NewEv from './pages/NewEv'
import NewEvType from './pages/NewEvType'
import UpdateEv from './pages/UpdateEv'
import UpdateEvType from './pages/UpdateEvType'
import DeleteEv from './pages/DeleteEv'
import DeleteEvType from './pages/DeleteEvType'
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
              <Link to="/NewEv">Add New Ev</Link>
            </li>
            <li>
              <Link to="/NewEvType">Add New Ev Type</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/ViewAllEvs" component={ViewAllEvs}></Route>
        <Route exact path="/ViewAllEvTypes" component={ViewAllEvTypes}></Route>
        <Route exact path="/NewEv" component={NewEv}></Route>
        <Route exact path="/NewEvType" component={NewEvType}></Route>
        <Route exact path="/ViewEv/:id" component={ViewEv}></Route>
        <Route exact path="/ViewEvType/:id" component={ViewEvType}></Route>
        <Route exact path="/UpdateEv/:id" component={UpdateEv}></Route>
        <Route exact path="/UpdateEvType/:id" component={UpdateEvType}></Route>
        <Route exact path="/DeleteEv/:id" component={DeleteEv}></Route>
        <Route exact path="/DeleteEvType/:id" component={DeleteEvType}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
