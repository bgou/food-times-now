export const CART_ACTIONS = {
  ADD: '@@cart/add',
}

export const addMenu = payload => ({
  type: CART_ACTIONS.ADD,
  payload,
})
