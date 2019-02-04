import { CART_ACTIONS } from './action'

const initialState = {
  items: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ACTIONS.ADD:
      console.log('payload: ' + JSON.stringify(payload, null, ' '))
      return {
        ...state,
        items: [...state.items, payload],
        total: state.total + payload.price,
      }

    default:
      return state
  }
}

export default cartReducer
