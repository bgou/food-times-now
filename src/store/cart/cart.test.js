import reducer from './reducer'
import { CART_ACTIONS } from './action'

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    total: 0,
    items: [],
  })
})

describe('item removal', () => {
  const itemId = 'abc1123'
  const name = 'pretty name'
  const price = 12
  const existingItems = [
    {
      itemId,
      name,
      price,
    },
  ]
  const prevState = { total: price, items: existingItems }

  it('should remove item by itemId and name', () => {
    expect(
      reducer(prevState, {
        type: CART_ACTIONS.REMOVE,
        payload: { itemId, name, price },
      })
    ).toEqual({
      items: [],
      total: 0,
    })
  })

  it('should not remove item if only name matches', () => {
    const noMatchItemId = itemId + itemId
    expect(
      reducer(prevState, {
        type: CART_ACTIONS.REMOVE,
        payload: { itemId: noMatchItemId, name, price },
      })
    ).toEqual({
      items: [
        {
          itemId,
          name,
          price,
        },
      ],
      total: price,
    })
  })
})
