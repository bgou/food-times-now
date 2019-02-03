import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

const styles = () => ({
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: 1
  }
});

const TopBar = ({ classes }) => {
  return (
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          小食代
        </Typography>
        <Button>亚马逊午餐</Button>
        <Button>月子餐</Button>
        <Button variant="outlined">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBar);
