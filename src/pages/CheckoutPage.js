import React from 'react'
import Cart from '../checkout/Cart'
import Delivery from '../checkout/Delivery'
import Payment from '../checkout/Payment'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
  },
})

const CheckoutPage = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Cart />
      <Delivery />
      <Payment />
    </div>
  )
}

export default withStyles(styles)(CheckoutPage)
