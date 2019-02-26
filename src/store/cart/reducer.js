import { CART_ACTIONS } from './action'
import findIndex from 'lodash/findIndex'

const initialState = {
  items: [],
  total: 0,
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ACTIONS.ADD:
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...payload,
          },
        ],
        total: state.total + payload.price,
      }
    case CART_ACTIONS.REMOVE:
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
    case CART_ACTIONS.UPDATE:
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
    default:
      return state
  }
}

export default cartReducer
