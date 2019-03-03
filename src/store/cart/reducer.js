import { CART_ACTIONS } from './action'
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
  for (const item of items) {
    const { options } = item
    for (const option of options) {
      for (const choice of option.choices) {
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
          ...curItems.slice(0, curItemIndex),
          updatedItem,
          ...curItems.slice(curItemIndex + 1, curItems.length),
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
      const items = state.items.filter(
        item => item.cartItemId !== payload.cartItemId
      )
      const total = getTotal(items)

      return {
        ...state,
        items,
        total,
      }
    }
    default:
      return state
  }
}

export default cartReducer
