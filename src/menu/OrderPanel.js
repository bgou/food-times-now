import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import MainCourse from "./MainCourse";

export class OrderPanel extends Component {
  static propTypes = {
    menuItem: PropTypes.object
  };

  render() {
    const { menuItem } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <MainCourse menuOption={menuItem.options[0]} />
          <MainCourse menuOption={menuItem.options[1]} />
        </Grid>
      </Grid>
    );
  }
}

export default OrderPanel;
