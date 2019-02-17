import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import FolderIcon from '@material-ui/icons/Folder'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
})

export class Cart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
  }

  render() {
    const { cart } = this.props
    return (
      <div>
        <List>
          {cart.items.map(item => (
            <ListItem key={item.name}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={item.price} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})
export default connect(mapStateToProps)(withStyles(styles)(Cart))
