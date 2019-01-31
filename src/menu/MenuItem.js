import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import OrderPanel from "./OrderPanel";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  optionButton: {
    marginRight: "8px"
  },
  chipWrapper: {
    margin: theme.spacing.unit
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

const Price = ({ price }) => {
  return `$${price.toFixed(2)}`;
};

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  static propTypes = {
    data: PropTypes.object
  };

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, data } = this.props;
    const { expanded } = this.state;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={data.entree_image}
          title={data.name}
        />
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={12}>
              <Typography inline variant="h6" component="span">
                {data.name}
              </Typography>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={e => this.handleExpandClick()}
                aria-expanded={expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto">
          <OrderPanel menuItem={data} />
        </Collapse>
      </Card>
    );
  }
}
export default withStyles(styles)(MenuItem);
