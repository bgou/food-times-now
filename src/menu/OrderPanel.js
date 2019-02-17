import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MainCourse from './MainCourse'

export class OrderPanel extends Component {
  static propTypes = {
    menuItem: PropTypes.object,
  }

  render() {
    const { menuItem } = this.props
    return (
      <Grid container>
        {menuItem.options.map((option, idx) => (
          <Grid item xs={12} key={idx}>
            <MainCourse menuOption={option} menuItem={menuItem} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default OrderPanel
