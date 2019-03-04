import { CART_ACTIONS } from './action'
import cloneDeep from 'lodash/cloneDeep'
import isNumber from 'lodash/isNumber'
import mockCart from '../../mock/cart'
// const initialState = {
//   items: [],
//   total: 0,
// }

const initialState = mockCart

const createCartItem = ({ cartItemId, menuItem, optionIndex, menuOption }) => {
  const newItem = cloneDeep(menuItem)
  newItem.cartItemId = cartItemId
  if (
    isNumber(optionIndex) &&
    optionIndex > -1 &&
    optionIndex < newItem.options.length
  ) {
    newItem.options[optionIndex] = menuOption
  }
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
      const { cartItemId } = payload
      // check if cartItemId already exists
      const { items: curItems } = state

      const curItemIndex = curItems.findIndex(
        val => val.cartItemId === cartItemId
      )

      let items = []

      if (curItemIndex === -1) {
        // if does not exist, add to items list
        const newItem = createCartItem({
          ...payload,
        })
        items = [...state.items, newItem]
      } else {
        // if already exists in cart, update
        const updatedItem = createCartItem({
          ...payload,
          menuItem: curItems[curItemIndex],
        })
        items = [
          ...curItems.slice(0, curItemIndex),
          updatedItem,
          ...curItems.slice(curItemIndex + 1, curItems.length),
        ]
      }

      const total = getTotal(items)

      const res = {
        ...state,
        items,
        total,
      }

      console.log(JSON.stringify(res))
      return res
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
