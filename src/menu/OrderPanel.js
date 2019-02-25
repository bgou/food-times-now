import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Course from './Course'
import range from 'lodash/range'
import cloneDeep from 'lodash/cloneDeep'

// Keeps track of how many orders each item has
// Each item may have different choices for different categories
export class OrderPanel extends Component {
  static propTypes = {
    menuItem: PropTypes.object,
    qty: PropTypes.number,
  }

  render() {
    const { menuItem, qty } = this.props
    const items = range(qty).map(i => {
      const id = `${qty}-${i}`
      return {
        id,
        menuItem: cloneDeep(menuItem),
      }
    })

    return (
      <Grid container>
        {items.map(item => (
          <Grid item key={item.id}>
            <Grid container>
              {item.menuItem.options.map((option, idx) => (
                <Grid item xs={12} key={idx}>
                  <Course
                    id={item.id}
                    menuOption={option}
                    menuItem={item.menuItem}
                  />
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
