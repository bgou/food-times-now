import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import range from 'lodash/range'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: 0,
  },
  select: {
    padding: `${theme.spacing.unit}px`,
    paddingRight: `${theme.spacing.unit * 3}px`,
  },
})

const QuantityControl = props => {
  const { classes, qty, add, subtract, handleQtyChange } = props
  return (
    <Fragment>
      <IconButton
        className={classes.button}
        aria-label="Add"
        onClick={subtract}
      >
        <Icon fontSize="small" color="primary">
          remove_circle
        </Icon>
      </IconButton>
      <Select
        value={qty}
        classes={{ select: classes.select }}
        onChange={handleQtyChange}
        input={<Input name="qty" id="qty" />}
      >
        {range(0, 11).map(q => (
          <MenuItem key={q} value={q}>
            {q.toString()}
          </MenuItem>
        ))}
      </Select>
      <IconButton className={classes.button} aria-label="Add" onClick={add}>
        <Icon fontSize="small" color="primary">
          add_circle
        </Icon>
      </IconButton>
    </Fragment>
  )
}

QuantityControl.propTypes = {
  classes: PropTypes.object.isRequired,
  qty: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  subtract: PropTypes.func.isRequired,
  handleQtyChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(QuantityControl)
