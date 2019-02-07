import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classnames from 'classnames'
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
})

const mobileWidth = 600

class MenuItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: window.innerWidth > mobileWidth,
      width: window.innerWidth,
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
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

  render() {
    const { classes, data } = this.props
    const { expanded } = this.state

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={data.entree_image}
          title={data.name}
        />
        <CardContent className={classes.cardContent}>
          <Grid
            container
            className={classes.itemTitle}
            onClick={e => this.handleExpandClick()}
          >
            <Grid item xs={12}>
              <Button>
                <Typography inline variant="h6" component="span">
                  {data.name}
                </Typography>

                <ExpandMoreIcon
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  aria-expanded={expanded}
                  aria-label="Show more"
                />
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto">
          <OrderPanel menuItem={data} />
        </Collapse>
      </Card>
    )
  }
}
export default withStyles(styles)(MenuItem)
