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
    choice: PropTypes.object.isRequired,
    selectionHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      color: "default"
    };
  }

  handleClick(choice) {
    const curColor = this.state.color;
    const color = curColor === "default" ? "primary" : "default";
    this.setState({ color });
  }

  render() {
    const { classes, choice } = this.props;
    const { color } = this.state;

    return (
      <Chip
        className={classes.chip}
        label={`${choice.name} $${choice.price.toFixed(2)}`}
        color={color}
        onClick={e => this.handleClick(e)}
        onDelete={e => this.handleClick(e)}
        deleteIcon={<DoneIcon />}
      />
    );
  }
}

export default withStyles(styles)(CourseSelection);
