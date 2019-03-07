# Food Times Now - Seriously

## Menu Structure

MenuCard

- CardContent
  - Item name
  - QuantityControl
- Collapse
  - Course (n)
    - CourseSelection (n)
    
## Schema
Please retrieve the latest completed schema from GraphiQL with the endpoint below:

https://gtop3chq80.execute-api.us-west-2.amazonaws.com/prod/graphql

(Click "Docs" on the right-top)

### A Few Examples
#### Get a menu by menu ID
```
query {
  menu(menu_id: "3cde5020-3419-11e9-a783-1fa6ce2f0e5c") {
    menu_id
    seller_code
    start_time
    end_time
    title
    subtitle
    menu_image
    items {
      item_id
      seller_code
      name
      price
      type
      entree_image
      status
      limit_count
      options {
        rice_options {
          name
          price
        }
        entree_options {
          name
          price
        }
      }
    }
  }
}
```

#### Update an order
```
mutation {
  putOrder(
    order_id:"426292b0-4092-11e9-a07d-f77cf975f48c", # Specify the order for udpates; optional for new creation
    orderInput: {
      user_id: "betaUser",
      menu_id: "3cde5020-3419-11e9-a783-1fa6ce2f0e5c",
      order_status: PLACED, # Optional. Default value is PLACED
      source: "wechat,ios",
      buyer_message: "Put it in my P.O.Box",
      seller_message: "Please pick up delivery at the front desk",
      delivery: {
        type: DELIVERY_BUILDING,
        building: Blackfoot
      },
      payment: {
        payee: "Firstname Lastname",
        method: "Venmo"
      }
      order_items: [
        {
          item_id: "4a2810f0-3418-11e9-8bb0-1b033ff48919",
          options: {
            rice_options: [
              {
                name: "White Rice",
                price: "0.00"
              }
            ],
            entree_options: []
          }
        },
        {
          item_id: "4a2810f0-3418-11e9-8bb0-1b033ff48919",
          options: {
            rice_options: [
              {
                name: "Brown Rice",
                price: "1.00"
              }
            ],
            entree_options: []
          }
        }
      ]
    }
  ) {
    user_id
    menu_id
    order_id
    source
    order_status
    buyer_message
    seller_message
    creation_time
    update_time
    payment {
      payee
      method
    }
    delivery {
      type
      building
      street1
      street2
      city
      state
      postal_code
    }
    order_items {
      item_id
      seller_code
      name
      price
      type
      entree_image
      options {
        rice_options {
          name
          price
        }
        entree_options {
          name
          price
        }
      }
    }
  }
}
```
