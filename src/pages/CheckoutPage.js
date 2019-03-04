import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import Cart from '../checkout/Cart'
import Delivery from '../checkout/Delivery'
import Payment from '../checkout/Payment'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
  },
  backButton: {
    marginBottom: theme.spacing.unit * 2,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

export class CheckoutPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  goBack = () => {
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Button
          fullWidth
          variant="outlined"
          className={classes.backButton}
          onClick={this.goBack.bind(this)}
        >
          <Icon className={classes.leftIcon}>arrow_left</Icon>
          Back
        </Button>
        <Cart />
        <Delivery />
        <Payment />
        <Button fullWidth variant="contained" color="primary">
          <Icon className={classes.leftIcon}>pets</Icon>
          Order
          <Icon className={classes.rightIcon}>pets</Icon>
        </Button>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(CheckoutPage))
