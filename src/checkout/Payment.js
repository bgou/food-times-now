import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import mockPaymentOptions from '../mock/payment_options'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px 0`,
    padding: `${theme.spacing.unit * 2}px`,
  },
  formControl: {
    marginTop: `${theme.spacing.unit * 2}px`,
  },
})

export class Payment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentOptions: [],
      selectedPaymentOption: '',
    }
  }

  componentDidMount = () => {
    this.setState({ paymentOptions: mockPaymentOptions })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { classes } = this.props

    const { paymentOptions, selectedPaymentOption } = this.state

    return (
      <Paper className={classes.root}>
        <Typography variant="h6">Payment</Typography>
        <FormControl fullWidth className={classes.formControl}>
          <Select
            value={selectedPaymentOption}
            onChange={this.handleChange}
            input={
              <Input name="selectedPaymentOption" id="selectedPaymentOption" />
            }
          >
            {paymentOptions &&
              paymentOptions.map(paymentOption => (
                <MenuItem key={paymentOption} value={paymentOption}>
                  {paymentOption}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>
    )
  }
}

export default withStyles(styles)(Payment)
