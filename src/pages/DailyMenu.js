import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'
import MenuCard from '../menu/MenuCard'
import ShoppingCartLink from '../menu/ShoppingCartLink'
import order_response from '../mock/order_response'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(2048 + theme.spacing.unit * 3 * 2)]: {
      width: 2048,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  absolute: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
})

const DailyMenu = ({ classes }) => {
  const data = order_response[0]
  return (
    <main className={classes.layout}>
      {/* Hero unit */}
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {data.title}
        </Typography>
        {data.subtitle.split('\n').map((line, i) => (
          <Typography
            key={i}
            variant="h6"
            align="center"
            color="textPrimary"
            component="p"
          >
            {line}
          </Typography>
        ))}
      </div>
      {/* End hero unit */}

      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {data.menu_items.map((menu_item, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
              <MenuCard data={menu_item} />
            </Grid>
          ))}
        </Grid>
      </div>
      <ShoppingCartLink />
    </main>
  )
}

DailyMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DailyMenu)
