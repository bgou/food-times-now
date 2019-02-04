import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, removeItem } from '../store/cart'

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
  }

  constructor(props) {
    super(props)
    this.state = {
      color: 'default',
    }
  }

  handleClick = e => {
    const { choice, dispatch, itemId } = this.props

    if (!choice.is_selected) {
      choice.is_selected = true
      dispatch(addItem({ ...choice, itemId }))
    } else {
      choice.is_selected = !choice.is_selected
      dispatch(removeItem({ ...choice, itemId }))
    }

    const color = this.getColor(choice)
    this.setState({ color })
  }

  getColor = choice => {
    return choice.is_selected === true ? 'primary' : 'default'
  }

  render() {
    const { classes, choice } = this.props
    const { color } = this.state

    return (
      <Chip
        className={classes.chip}
        label={`${choice.name} $${choice.price.toFixed(2)}`}
        color={color}
        onClick={this.handleClick}
        onDelete={this.handleClick}
        deleteIcon={<DoneIcon />}
      />
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})
export default connect(mapStateToProps)(withStyles(styles)(CourseSelection))
