import { CART_ACTIONS } from './action'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'

const initialState = {
  items: [],
  total: 0,
}

const createCartItem = (existingItem, optionIndex, menuOption) => {
  const newItem = cloneDeep(existingItem)
  newItem.options[optionIndex] = menuOption
  return newItem
}

const getTotal = items => {
  let total = 0
  // item = {options: [ { choices: { price }}]}
  for (const item of items) {
    const { options } = item
    // console.log('options: ' + options);
    for (const option of options) {
      // console.log('choices: ' + JSON.stringify(choices, null, ' '));
      for (const choice of option.choices) {
        console.log('choice: ' + JSON.stringify(choice, null, ' '))
        total += choice.is_selected ? choice.price || 0 : 0
      }
    }
  }
  return total
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ACTIONS.ADD: {
      const { cartItemId, menuItem, optionIndex, menuOption } = payload
      // check if cartItemId already exists
      const { items: curItems } = state

      const curItemIndex = curItems.findIndex(
        val => val.cartItemId === cartItemId
      )

      let items = []

      if (curItemIndex === -1) {
        // if does not exist, add to items list
        const newItem = createCartItem(menuItem, optionIndex, menuOption)
        items = [...state.items, newItem]
      } else {
        // if already exists in cart, update
        const updatedItem = createCartItem(
          curItems[curItemIndex],
          optionIndex,
          menuOption
        )
        items = [
          ...curItems.splice(0, curItemIndex),
          updatedItem,
          ...curItems.splice(curItemIndex + 1, curItems.length),
        ]
      }

      const total = getTotal(items)

      return {
        ...state,
        items,
        total,
      }
    }
    case CART_ACTIONS.REMOVE: {
      let total = 0
      const items = state.items.reduce((result, item) => {
        if (item.id !== payload.id) {
          // total += item.price
          result.push(item)
        }
        return result
      }, [])

      return {
        ...state,
        items,
        total,
      }
    }
    case CART_ACTIONS.UPDATE: {
      // const total = 0

      // find the item and replace item with payload
      const index = findIndex(state.items, { id: payload.id })

      const newItems = [
        ...state.items.splice(0, index),
        { ...payload },
        ...state.items.splice(index + 1),
      ]

      return {
        ...state,
        items: newItems,
        total: state.total,
      }
    }
    default:
      return state
  }
}

export default cartReducer
