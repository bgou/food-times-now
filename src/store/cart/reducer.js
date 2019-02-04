import { CART_ACTIONS } from './action'

const initialState = {
  items: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ACTIONS.ADD:
      return { ...state, ...payload }

    default:
      return state
  }
}

export default cartReducer
