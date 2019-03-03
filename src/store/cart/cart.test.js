import reducer from './reducer'
import { CART_ACTIONS } from './action'
import cloneDeep from 'lodash/cloneDeep'

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    total: 0,
    items: [],
  })
})
describe('cart reducer', () => {
  let price
  let existingItems
  let prevState
  let newMenuOption
  let newItem
  let payload

  beforeEach(() => {
    price = 19.99
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

  describe('item removal', () => {
    it('should remove item by cartItemId', () => {
      payload.cartItemId = prevState.items[1].cartItemId
      const newState = reducer(prevState, {
        type: CART_ACTIONS.REMOVE,
        payload,
      })
      expect(newState.items.length).toEqual(prevState.items.length - 1)
    })

    it('should update total', () => {
      payload.cartItemId = prevState.items[1].cartItemId
      const newState = reducer(prevState, {
        type: CART_ACTIONS.REMOVE,
        payload,
      })

      expect(newState.total).toEqual(prevState.total)
    })
  })

  describe('item add', () => {
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

      expect(newState.items).toEqual([
        {
          cartItemId: 100,
          ...newItem,
        },
        ...existingItems.slice(1),
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
})
