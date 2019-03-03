import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import ReceiptIcon from '@material-ui/icons/Receipt'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

export class Cart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
  }

  render() {
    const { cart, classes } = this.props

    if (isEmpty(cart.items)) {
      return null
    }

    return (
      <div>
        <List>
          {cart.items.map(cartItem => (
            <React.Fragment key={cartItem.cartItemId}>
              <MainItem item={cartItem} />
              {/* <AddOnItems
                items={groupedItems[itemId]}
                className={classes.nested}
              /> */}
            </React.Fragment>
          ))}
        </List>
      </div>
    )
  }
}

const MainItem = ({ item }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={item.entree_image} />
      </ListItemAvatar>
      <ListItemText inset primary={item.name} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const AddOnItems = ({ className, items }) => {
  return items.map(item => (
    <ListItem button className={className} key={item.name}>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText inset primary={item.name} secondary={item.price} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))
}

const mapStateToProps = state => ({
  cart: state.cart,
})
export default connect(mapStateToProps)(withStyles(styles)(Cart))
