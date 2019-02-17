import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
})

export class CourseSelection extends Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
    choice: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
  }

  getColor = choice => {
    return choice.is_selected === true ? 'primary' : 'default'
  }

  render() {
    const { classes, choice, handleClick } = this.props
    const color = this.getColor(choice)

    return (
      <Chip
        className={classes.chip}
        label={`${choice.name} $${choice.price.toFixed(2)}`}
        color={color}
        onClick={handleClick}
        onDelete={handleClick}
        deleteIcon={<CheckCircleIcon />}
      />
    )
  }
}

export default withStyles(styles)(CourseSelection)
