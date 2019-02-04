import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CourseSelection from './CourseSelection'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
})

class MainCourse extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    menuOption: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
  }

  render() {
    const { classes, itemId, menuOption } = this.props

    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="subtitle1">
          {menuOption.category}
        </Typography>
        {menuOption.choices.map((choice, idx) => (
          <CourseSelection key={idx} itemId={itemId} choice={choice} />
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(MainCourse)
