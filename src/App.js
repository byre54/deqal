import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Profile from './components/Profile'
import Create from './components/CreateProfile'
import Edit from './components/EditProfile'
import AppBar from './components/AppBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App () {
  return (
    <Router basename={process.env.REACT_APP_PUBLIC_URL}>
      <AppBar />
      <Container maxWidth='sm'>
        <Box my={4}>
          <Switch>
            <Route path='/' exact component={Create} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/edit' exact component={Edit} />
            <Route path='/' component={Profile} />
          </Switch>
        </Box>
      </Container>
    </Router>
  )
}
