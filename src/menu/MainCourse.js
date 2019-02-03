import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CourseSelection from "./CourseSelection";

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  }
});

class MainCourse extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    menuOption: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  handleDelete(choice) {}

  handleSelect(choice) {
    this.setState({ color: "primary" });
  }

  render() {
    const { classes, menuOption } = this.props;

    return (
      <div className={classes.root}>
        <Typography gutterBottom variant="subtitle1">
          {menuOption.category}
        </Typography>
        {menuOption.choices.map((choice, idx) => (
          <CourseSelection
            key={idx}
            choice={choice}
            selectionHandler={this.handleSelect}
            deleteHandler={this.handleDelete}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(MainCourse);
