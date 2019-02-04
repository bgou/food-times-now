import { CART_ACTIONS } from './action'

const initialState = {
  items: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ACTIONS.ADD:
      return {
        ...state,
        items: [...state.items, payload],
        total: state.total + payload.price,
      }
    case CART_ACTIONS.REMOVE:
      const items = state.items.filter(item => item.name !== payload.name)
      return {
        ...state,
        items,
        total: state.total - payload.price,
      }
    default:
      return state
  }
}

export default cartReducer
