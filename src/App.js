import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  withStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Footer from './layout/Footer'
import TopBar from './layout/TopBar'
import DailyMenu from './pages/DailyMenu'
import Cart from './pages/Cart'

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
        {/* <Route> */}
        <Cart />
        <TopBar />
        <DailyMenu />
        {/* </Route> */}
        <Footer />
      </MuiThemeProvider>
    </React.Fragment>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
