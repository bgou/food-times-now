import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CourseSelection from './CourseSelection'
import { addItem, removeItem } from '../store/cart'

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

  constructor(props) {
    super(props)
    this.state = {
      itemsSelected: 0,
    }
    this.handleClick = this.handleClick.bind(this)
    this.updateCount = this.updateCount.bind(this)
  }

  updateCount(count) {
    const { itemsSelected } = this.state
    this.setState({ itemsSelected: itemsSelected + count })
  }

  handleMultiSelect(itemId, choice) {
    const { dispatch, menuOption } = this.props
    const { max_choices } = menuOption

    if (!choice.is_selected) {
      if (this.state.itemsSelected + 1 > max_choices) {
        this.setState({
          error: true,
          errorText: `最多只可以选择 ${max_choices} 种哦亲!`,
        })
        return
      }
      choice.is_selected = true
      this.updateCount(1)
      dispatch(addItem({ ...choice, itemId }))
    } else {
      this.setState({ error: false, errorText: null })
      choice.is_selected = false
      this.updateCount(-1)
      dispatch(removeItem({ ...choice, itemId }))
    }
  }

  handleSingleSelect(itemId, choice) {
    const { dispatch, menuOption } = this.props
    const { choices } = menuOption

    const selected = choices.filter(c => c.is_selected)

    let differentItem = true
    for (const c of selected) {
      c.is_selected = false
      this.updateCount(-1)
      dispatch(removeItem({ ...c, itemId }))
      if (c.name === choice.name) {
        differentItem = false
      }
    }

    if (differentItem) {
      choice.is_selected = true
      this.updateCount(1)
      dispatch(addItem({ ...choice, itemId }))
    }
  }

  handleClick = (itemId, choice) => {
    if (this.props.menuOption.max_choices > 1) {
      this.handleMultiSelect(itemId, choice)
    } else {
      this.handleSingleSelect(itemId, choice)
    }
  }

  render() {
    const { classes, itemId, menuOption } = this.props

    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="subtitle1">
          {menuOption.category}
        </Typography>
        {this.state.error && (
          <Typography gutterBottom variant="subtitle2" color="error">
            {this.state.errorText}
          </Typography>
        )}
        {menuOption.choices.map((choice, idx) => (
          <CourseSelection
            key={idx}
            itemId={itemId}
            choice={choice}
            handleClick={e => this.handleClick(itemId, choice)}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})
export default connect(mapStateToProps)(withStyles(styles)(MainCourse))
