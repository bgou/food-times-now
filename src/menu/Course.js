import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../store/cart'
import CourseSelection from './CourseSelection'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
})

class Course extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    menuItem: PropTypes.object.isRequired,
    optionIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    const { optionIndex, menuItem } = props
    const menuOption = menuItem.options[optionIndex]
    this.state = {
      itemsSelected: 0,
      menuOption,
      menuItem,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSingleSelect = this.handleSingleSelect.bind(this)
  }

  incrementCount(count) {
    const { itemsSelected } = this.state
    this.setState({ itemsSelected: itemsSelected + count })
  }

  handleMultiSelect(choiceIndex) {
    const { dispatch, id, menuItem, optionIndex } = this.props
    const { menuOption } = this.state
    const { max_choices, choices } = menuOption

    const choice = choices[choiceIndex]

    if (!choice.is_selected) {
      // clicking on an unselected option
      if (this.state.itemsSelected >= max_choices) {
        // if maximum items have been selected
        this.setState({
          error: true,
          errorText: `最多只可以选择 ${max_choices} 种哦亲!`,
        })
        return
      }

      choice.is_selected = true
      this.incrementCount(1)
    } else {
      // clicking on a selected option
      this.setState({ error: false, errorText: null })
      choice.is_selected = false
      this.incrementCount(-1)
    }

    // calling addItem will update the menuItem's option choices
    dispatch(
      addItem({
        cartItemId: id,
        menuItem,
        optionIndex,
        menuOption,
      })
    )
  }

  handleSingleSelect(choiceIndex) {
    const { dispatch, id, menuItem, optionIndex } = this.props
    const { menuOption } = this.state
    const { choices } = menuOption

    const selected = choices.filter(c => c.is_selected)

    if (!isEmpty(selected)) {
      // remove all currently selected items
      for (const c of selected) {
        c.is_selected = false
        this.incrementCount(-1)
      }
    }

    choices[choiceIndex].is_selected = true
    this.incrementCount(1)

    dispatch(
      addItem({
        cartItemId: id,
        menuItem,
        optionIndex,
        menuOption,
      })
    )
  }

  handleClick = choiceIndex => {
    if (this.state.menuOption.max_choices > 1) {
      this.handleMultiSelect(choiceIndex)
    } else {
      this.handleSingleSelect(choiceIndex)
    }
  }

  render() {
    const { classes, cart } = this.props
    const { menuOption } = this.state

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
            menuOption={menuOption}
            choice={choice}
            handleClick={e => this.handleClick(idx)}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})
export default connect(mapStateToProps)(withStyles(styles)(Course))
