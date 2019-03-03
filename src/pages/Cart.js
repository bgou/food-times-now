import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import ReceiptIcon from '@material-ui/icons/Receipt'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeItem } from '../store/cart'

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

  deleteHandler = item => {
    this.props.dispatch(removeItem(item))
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
              <MainItem
                item={cartItem}
                deleteHandler={this.deleteHandler.bind(this)}
              />
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

const MainItem = ({ item, deleteHandler }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={item.entree_image} />
      </ListItemAvatar>
      <ListItemText inset primary={item.name} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={e => deleteHandler(item)}>
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
