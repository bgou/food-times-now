import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from './layout/Footer';
import TopBar from './layout/TopBar';
import DailyMenu from './pages/DailyMenu';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  }
});

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar />
      <DailyMenu />
      <Footer />
    </React.Fragment>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);