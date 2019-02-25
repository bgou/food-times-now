import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Course from './Course'
import range from 'lodash/range'
import cloneDeep from 'lodash/cloneDeep'

const getCartId = (menuItem, index) => {
  return `${menuItem.id}-${index}`
}

const createNewItem = (menuItem, i) => {
  return {
    id: getCartId(menuItem.id, i),
    menuItem: cloneDeep(menuItem),
  }
}

// Keeps track of how many orders each item has
// Each item may have different choices for different categories
export class OrderPanel extends Component {
  static propTypes = {
    menuItem: PropTypes.object,
    qty: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    const { menuItem, qty } = this.props

    const items = range(qty).map(i => {
      return createNewItem(menuItem, i)
    })

    this.setState({ items })
  }

  componentDidUpdate(prevProps) {
    if (this.props.qty !== prevProps.qty) {
      this.onQuantityChange(this.props.qty)
    }
  }

  // when quantity is changed from outside
  onQuantityChange = newQty => {
    const { menuItem } = this.props

    const oldQty = this.state.items.length

    if (newQty > oldQty) {
      // add new item(s)
      const addCount = newQty - oldQty
      const newItems = range(addCount).map(i => {
        return createNewItem(menuItem, oldQty + i)
      })
      this.setState({
        items: [...this.state.items, ...newItems],
      })
    } else if (oldQty > newQty) {
      // remove last item
      this.setState({
        items: [...this.state.items.slice(0, newQty)],
      })
    }
  }

  render() {
    const { items } = this.state

    return (
      <Grid container>
        {items.map(item => (
          <Grid item xs={12} key={item.id}>
            {item.menuItem.options.map((option, idx) => (
              <Course
                key={idx}
                id={item.id}
                menuOption={option}
                menuItem={item.menuItem}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default OrderPanel
