import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Divider from "@material-ui/core/Divider";

export class OptionalCourse extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    menuItem: PropTypes.object.isRequired
  }

  render() {
    const {menuItem} = this.props
    return (
      <div>
          <Divider variant="middle" />

        {/* {menuItem.} */}
      </div>
    )
  }
}

export default OptionalCourse
