import Badge from '@material-ui/core/Badge'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const styles = theme => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

export class ShoppingCart extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes, cart } = this.props

    const count = cart.items.length
    return (
      <Fab color="primary" className={classes.absolute}>
        <Badge color="secondary" badgeContent={count}>
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps)(withStyles(styles)(ShoppingCart))
