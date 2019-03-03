import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CourseSelection from './CourseSelection'
import { addItem, removeItem, updateItem } from '../store/cart'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'

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

  updateCount(count) {
    const { itemsSelected } = this.state
    this.setState({ itemsSelected: itemsSelected + count })
  }

  handleMultiSelect(menuItem, choice) {
    const { dispatch, menuOption, id } = this.props
    const { max_choices } = menuOption
    const itemId = id

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
      dispatch(
        addItem({
          itemId,
          mainItemName: menuItem.name,
          mainItemImg: menuItem.entree_image,
          ...choice,
        })
      )
    } else {
      this.setState({ error: false, errorText: null })
      choice.is_selected = false
      this.updateCount(-1)
      dispatch(removeItem({ ...choice, itemId }))
    }
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
      }
    }

    choices[choiceIndex].is_selected = true
    this.updateCount(1)

    console.log(
      `optionIndex: ${optionIndex}, choiceIndex: ${choiceIndex}, id: ${id}`
    )
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

  componentDidMount() {
    const { menuOption } = this.state
    this.updateDefaultSelection(menuOption)
  }

  updateDefaultSelection = menuOption => {
    const { default_selection } = menuOption
    if (isNumber(default_selection)) {
      const { dispatch, id, menuItem, optionIndex } = this.props
      const selection = menuOption.choices[default_selection]
      selection.is_selected = true

      dispatch(
        addItem({
          cartItemId: id,
          menuItem,
          optionIndex,
          menuOption,
        })
      )
    }
  }

  render() {
    const { classes } = this.props
    const { menuOption, menuItem } = this.state

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
