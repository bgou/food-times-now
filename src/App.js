import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Footer from './layout/Footer'
import TopBar from './layout/TopBar'
import CheckoutPage from './pages/CheckoutPage'
import DailyMenu from './pages/DailyMenu'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffd740',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

function App() {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <TopBar />
            <Switch>
              <Route path="/" exact component={DailyMenu} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </MuiThemeProvider>
    </React.Fragment>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
