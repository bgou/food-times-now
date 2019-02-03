import React, { Component } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export class CourseSelection extends Component {
  static propTypes = {
    choice: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      color: "default"
    };
  }

  handleClick = e => {
    const { choice } = this.props;
    if (!choice.is_selected) {
      choice.is_selected = true;
    } else {
      choice.is_selected = !choice.is_selected;
    }

    const color = this.getColor(choice);

    this.setState({ color });
  };

  getColor = choice => {
    return choice.is_selected === true ? "primary" : "default";
  };

  render() {
    const { classes, choice } = this.props;
    const { color } = this.state;

    return (
      <Chip
        className={classes.chip}
        label={`${choice.name} $${choice.price.toFixed(2)}`}
        color={color}
        onClick={this.handleClick}
        onDelete={this.handleClick}
        deleteIcon={<DoneIcon />}
      />
    );
  }
}

export default withStyles(styles)(CourseSelection);
