import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from "react-helmet";
import MenuItem from '../menu/MenuItem';
import order_response from '../mock/order_response';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
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
});


const DailyMenu = ({classes}) => {
  const data = order_response[0]
  return (<main className={classes.layout}>
    {/* Hero unit */}
    <Helmet>
      <title>{data.title}</title>
    </Helmet>
    <div className={classes.heroContent}>
      <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
        {data.title}
      </Typography>
      {
        data.subtitle.split('\n').map((line, i)=>(
          <Typography key={i} variant="h6" align="center" color="textPrimary" component="p">
            {line}
          </Typography>
        )) 
      }
    </div>
    {/* End hero unit */}
    
    <div className={classNames(classes.layout, classes.cardGrid)}>
      <Grid container spacing={40}>
        {data.menu_items.map((menu_item,idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
            <MenuItem data={menu_item} />
          </Grid>
        ))}
      </Grid>
    </div>
  </main>)
}

DailyMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DailyMenu);