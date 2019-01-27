import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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
    flexGrow: 1
  },
  optionsGroup: {
    // flexGrow: 1
  },
  optionButton: {
    marginRight: "8px"
  }
});

const Price = ({ price }) => {
  return `$${price.toFixed(2)}`;
};

class MenuItem extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render() {
    const { classes, data } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={data.entree_image}
          title={data.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            {data.name}
          </Typography>
        </CardContent>
        <CardActions>
          <div className={classes.optionsGroup}>
            <Button
              size="medium"
              color="primary"
              className={classes.optionButton}
            >
              来一份 <Price price={data.price} />
            </Button>
            {data.options &&
              data.options.map((option, idx) => (
                <div key={idx}>
                  {option.choices.map((choice, c_idx)=>(
                  <Button
                    key={c_idx}
                    size="medium"
                    color="primary"
                    className={classes.optionButton}
                  >
                    +{choice.name} <Price price={choice.price} />
                  </Button>
                  ))}
                </div>
              ))}
          </div>
        </CardActions>
      </Card>
    );
  }
}
export default withStyles(styles)(MenuItem);
