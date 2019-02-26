import { CART_ACTIONS } from './action'

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
    default:
      return state
  }
}

export default cartReducer
