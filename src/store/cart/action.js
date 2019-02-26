export const CART_ACTIONS = {
  ADD: '@@cart/add',
  REMOVE: '@@cart/remove',
  UPDATE: '@@cart/update',
}

export const addItem = payload => ({
  type: CART_ACTIONS.ADD,
  payload,
})

export const removeItem = payload => ({
  type: CART_ACTIONS.REMOVE,
  payload,
})

export const updateItem = payload => ({
  type: CART_ACTIONS.UPDATE,
  payload,
})
