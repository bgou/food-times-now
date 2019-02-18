import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import range from 'lodash/range'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OrderPanel from './OrderPanel'

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
  button: {
    margin: 0,
  },
  select: {
    padding: `${theme.spacing.unit}px`,
    paddingRight: `${theme.spacing.unit * 3}px`,
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

const mobileWidth = 600

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
    this.setState({ qty: e.target.value })
  }

  subtract = e => {
    if (this.state.qty > 0) {
      this.setState({ qty: this.state.qty - 1 })
    }
  }

  add = e => {
    const { limit_count } = this.props.data
    if (this.state.qty + 1 > limit_count) {
      this.setState({ errorText: `最多可以点 ${limit_count} 份喔亲` })
    } else {
      this.setState({ qty: this.state.qty + 1 })
    }
  }

  render() {
    const { classes, data } = this.props
    const { qty } = this.state

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
              <IconButton
                className={classes.button}
                aria-label="Add"
                onClick={this.subtract}
              >
                <Icon fontSize="small" color="primary">
                  remove_circle
                </Icon>
              </IconButton>
              <Select
                value={qty}
                classes={{ select: classes.select }}
                onChange={this.handleQtyChange}
                input={<Input name="qty" id="qty" />}
              >
                {range(0, 11).map(q => (
                  <MenuItem key={q} value={q}>
                    {q.toString()}
                  </MenuItem>
                ))}
              </Select>
              <IconButton
                className={classes.button}
                aria-label="Add"
                onClick={this.add}
              >
                <Icon fontSize="small" color="primary">
                  add_circle
                </Icon>
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={qty > 0} timeout="auto">
          <OrderPanel menuItem={data} qty={qty} />
        </Collapse>
      </Card>
    )
  }
}
export default withStyles(styles)(MenuCard)
