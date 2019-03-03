import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import cloneDeep from 'lodash/cloneDeep'
import isNumber from 'lodash/isNumber'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, removeItem } from '../store/cart/action'
import Course from './Course'
import QuantityControl from './QuantityControl'

const mobileWidth = 600
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 0,
  },
  itemTitle: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  qtyControl: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

const getCartId = (menuItemId, index) => {
  return `${menuItemId}@${index}`
}

const createNewCartItem = (menuItem, i) => {
  const cartItem = cloneDeep(menuItem)
  cartItem.options.forEach(opt => {
    const { choices, default_selection } = opt
    if (
      isNumber(default_selection) &&
      default_selection >= 0 &&
      default_selection < choices.length
    ) {
      choices[default_selection].is_selected = true
    }
  })

  return {
    id: getCartId(menuItem.id, i),
    menuItem: cartItem,
  }
}

class MenuCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0,
      errorText: '',
      expanded: window.innerWidth > mobileWidth,
      width: window.innerWidth,
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }

  static propTypes = {
    data: PropTypes.object,
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleQtyChange(e) {
    this.updateOrderQty(e.target.value)
  }

  subtract = e => {
    const currentOrderQty = this.props.cart.items.length
    if (currentOrderQty > 0) {
      this.updateOrderQty(currentOrderQty - 1)
    }
  }

  add = e => {
    const { limit_count } = this.props.data
    const desiredQty = this.props.cart.items.length + 1

    if (desiredQty > limit_count) {
      this.setState({ errorText: `最多可以点 ${limit_count} 份喔亲` })
    } else {
      this.setState({ errorText: undefined })
      this.updateOrderQty(desiredQty)
    }
  }

  updateOrderQty = newQty => {
    const { data: menuItem, cart, dispatch } = this.props
    const currentOrders = cart.items
    const oldQty = currentOrders.length

    if (newQty > oldQty) {
      // add new item(s) to cart
      const addCount = newQty - oldQty
      range(addCount).map(i => {
        const o = createNewCartItem(menuItem, oldQty + i)
        dispatch(
          addItem({
            cartItemId: o.id,
            menuItem: o.menuItem,
          })
        )
        return o
      })
    } else if (oldQty > newQty) {
      // remove last orders
      for (const order of currentOrders.slice(newQty)) {
        dispatch(removeItem(order))
      }
    }
  }

  render() {
    const { classes, cart, data } = this.props
    const { items: cartItems } = cart

    const items = cartItems.filter(item => item.id === data.id)
    const qty = items.length

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={data.entree_image}
          title={data.name}
        />
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={7} className={classes.itemTitle}>
              <Button onClick={e => this.handleExpandClick()}>
                <Typography inline variant="h6" component="span">
                  {data.name}
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={5} className={classes.qtyControl}>
              <QuantityControl
                qty={qty}
                add={this.add}
                subtract={this.subtract}
                handleQtyChange={this.handleQtyChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={qty > 0} timeout="auto">
          {items.map((item, itemIndex) => (
            <Grid container key={itemIndex}>
              <Grid item xs={12}>
                <Divider />
                {item.options.map((option, optIdx) => (
                  <Course
                    key={optIdx}
                    id={item.cartItemId}
                    optionIndex={optIdx}
                    menuItem={item}
                  />
                ))}
              </Grid>
            </Grid>
          ))}
        </Collapse>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
})
export default connect(mapStateToProps)(withStyles(styles)(MenuCard))
