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
  const itemId = 'abc1123'
  const name = 'some name'
  const price = 20
  const existingItems = [
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
  const prevState = { total: price, items: existingItems }

  it('should add item if item id is not the same', () => {
    const newItemId = 'akdjflk'
    expect(
      reducer(prevState, {
        type: CART_ACTIONS.ADD,
        payload: { itemId: newItemId, name: name, price },
      })
    ).toEqual({
      items: [
        ...existingItems,
        {
          itemId: newItemId,
          name,
          price,
        },
      ],
      total: price * 2,
    })
  })

  it('should add item if item id is the same but name is not', () => {
    const newName = 'the glorious meal'
    expect(
      reducer(prevState, {
        type: CART_ACTIONS.ADD,
        payload: { itemId: itemId, name: newName, price },
      })
    ).toEqual({
      items: [
        ...existingItems,
        {
          itemId,
          name: newName,
          price,
        },
      ],
      total: price * 2,
    })
  })

  it('should sum the total', () => {
    const menuOption = {
      choices: [
        {
          is_selected: true,
          price: 50.01,
        },
      ],
    }
    const newItem = {
      options: [menuOption],
    }

    const payload = {
      cartItemId: 200,
      menuItem: newItem,
      optionIndex: 0,
      menuOption,
    }
    expect(
      reducer(prevState, {
        type: CART_ACTIONS.ADD,
        payload,
      })
    ).toEqual({
      items: [...existingItems, newItem],
      total: 70,
    })
  })
})
