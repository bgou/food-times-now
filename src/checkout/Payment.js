import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px 0`,
    padding: `${theme.spacing.unit * 2}px`,
  },
})

export class Payment extends Component {
  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Typography variant="h6">Payment</Typography>
      </Paper>
    )
  }
}

export default withStyles(styles)(Payment)
