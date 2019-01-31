import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  },
  chipWrapper: {
    margin: theme.spacing.unit
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

    const config = {
      color: "default",
      onDelete: "none",
      avatar: "none",
      icon: "none",
      variant: "default"
    };
    const { color, onDelete, avatar, icon, variant } = config;

    const handleDelete = e => {
      alert("delete clicked");
    };
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
                <Grid container xs={12} key={idx}>
                  {option.choices.map((choice, c_idx) => (
                    <Grid item className={classes.chipWrapper} key={c_idx}>
                      <FormControl component="fieldset">
                        <FormLabel>avatar</FormLabel>
                        <Chip
                          label={`${choice.name} $${choice.price.toFixed(2)}`}
                          key={c_idx}
                          color={color}
                          // deleteIcon={"default"}
                          onDelete={handleDelete}
                          // avatar={avatarToPlayground}
                          // icon={iconToPlayground}
                          variant={variant}
                        />
                      </FormControl>
                    </Grid>
                  ))}
                </Grid>
              ))}
          </div>
        </CardActions>
      </Card>
    );
  }
}
export default withStyles(styles)(MenuItem);
