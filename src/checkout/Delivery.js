import { Paper } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import mockLocations from '../mock/delivery_locations'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2}px 0`,
    padding: `${theme.spacing.unit * 2}px`,
  },
  select: {
    width: '100%',
  },
  formControl: {
    marginTop: `${theme.spacing.unit * 2}px`,
  },
})

export class Delivery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locations: [],
      selectedLocation: '',
    }
  }

  componentDidMount() {
    const locations = mockLocations
    locations.sort()
    this.setState({ locations })
  }

  handleChange = e => {
    this.setState({ selectedLocation: e.target.value })
  }

  render() {
    const { classes } = this.props
    const { locations, selectedLocation } = this.state

    return (
      <Paper className={classes.root}>
        <Typography variant="h6">Delivery</Typography>
        <FormControl fullWidth className={classes.formControl}>
          <Select
            value={selectedLocation}
            className={classes.select}
            // classes={{ select: classes.select }}
            onChange={this.handleChange}
            input={<Input name="selectedLocation" id="selectedLocation" />}
          >
            {locations &&
              locations.map(location => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>
    )
  }
}

export default withStyles(styles)(Delivery)
