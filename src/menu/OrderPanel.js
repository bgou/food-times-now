import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MainCourse from './MainCourse'
import range from 'lodash/range'

export class OrderPanel extends Component {
  static propTypes = {
    menuItem: PropTypes.object,
    qty: PropTypes.number,
  }

  render() {
    const { menuItem, qty } = this.props
    return (
      <Grid container>
        {range(qty).map(i => (
          <Grid item key={i}>
            <Grid container>
              {menuItem.options.map((option, idx) => (
                <Grid item xs={12} key={idx}>
                  <MainCourse menuOption={option} menuItem={menuItem} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default OrderPanel
