import reducer from './reducer'
import { CART_ACTIONS } from './action'
import cloneDeep from 'lodash/cloneDeep'

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

  it('should not remove item if only id matches', () => {
    const noMatchName = name + name
    expect(
      reducer(prevState, {
        type: CART_ACTIONS.REMOVE,
        payload: { itemId: itemId, name: noMatchName, price },
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

describe('item add', () => {
  let price
  let existingItems
  let prevState
  let newMenuOption
  let newItem
  let payload

  beforeEach(() => {
    price = 20
    existingItems = [
      {
        cartItemId: 100,
        options: [
          {
            choices: [
              {
                is_selected: true,
                price: 19.99,
              },
            ],
          },
        ],
      },
      {
        cartItemId: 101,
        options: [
          {
            choices: [
              {
                price: 17.99,
              },
            ],
          },
        ],
      },
    ]
    prevState = { total: price, items: existingItems }

    newMenuOption = {
      choices: [
        {
          is_selected: true,
          price: 50.01,
        },
      ],
    }
    newItem = {
      options: [newMenuOption],
    }

    payload = {
      cartItemId: 200,
      menuItem: newItem,
      optionIndex: 0,
      menuOption: newMenuOption,
    }
  })
  it('should add item if item id is not the same', () => {
    const newState = reducer(prevState, {
      type: CART_ACTIONS.ADD,
      payload,
    })

    expect(newState.items).toEqual([...existingItems, newItem])
  })

  it('should update item if item id is the same', () => {
    const updatedPayload = cloneDeep(payload)
    updatedPayload.cartItemId = 100

    const newState = reducer(prevState, {
      type: CART_ACTIONS.ADD,
      payload: updatedPayload,
    })

    const rest = existingItems.slice(1)
    expect(newState.items).toEqual([
      {
        cartItemId: 100,
        ...newItem,
      },
      ...rest,
    ])
  })

  it('should sum the total', () => {
    const newState = reducer(prevState, {
      type: CART_ACTIONS.ADD,
      payload,
    })

    expect(newState.total).toEqual(70)
  })
})
