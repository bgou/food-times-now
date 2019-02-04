export const CART_ACTIONS = {
  ADD: '@@cart/add',
  REMOVE: '@@cart/remove',
}

export const addItem = payload => ({
  type: CART_ACTIONS.ADD,
  payload,
})

export const removeItem = payload => ({
  type: CART_ACTIONS.REMOVE,
  payload,
})
