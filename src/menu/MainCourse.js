import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class MainCourse extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    menuOption: PropTypes.object.isRequired
  };

  handleDelete(e) {
    console.log(e);
  }

  render() {
    // const {menuOption} = this.props
    const { classes, menuOption} = this.props;
    // const menuOption = {
    //   category: "主食",
    //   max_choices: 1,
    //   default_selection: 0,
    //   choices: [
    //     {
    //       name: "白饭",
    //       price: 0
    //     },
    //     {
    //       name: "糙饭",
    //       price: 1
    //     },
    //     {
    //       name: "白饭加量",
    //       price: 1
    //     }
    //   ]
    // };

    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="subtitle1">
          {menuOption.category}
        </Typography>
        {menuOption.choices.map((choice, idx) => (
          <Chip
            className={classes.chip}
            label={`${choice.name} $${choice.price.toFixed(2)}`}
            key={idx}
            // color={color}
            onDelete={e => this.handleDelete(e)}
            // variant={variant}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(MainCourse);
