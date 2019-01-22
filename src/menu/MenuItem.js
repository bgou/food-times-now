import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    }
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
    flexGrow: 1,
  }
})

class MenuItem extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const {classes, data} = this.props
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={data.imgSrc}
          title={data.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography>
            {data.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Order
          </Button>
          <Button size="small" color="primary">
            Clear
          </Button>
        </CardActions>
      </Card>
    )
  }
}
export default withStyles(styles)(MenuItem)