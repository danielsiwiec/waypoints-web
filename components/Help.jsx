import React from 'react'
import { Modal, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import HelpIcon from '@material-ui/icons/Help'

function getModalStyle () {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class Help extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes } = this.props
    return (
      <span>
        <IconButton onClick={this.handleOpen}>
          <HelpIcon />
        </IconButton>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
          Enter name of a location or coordinates in one of these formats:
            <ul>
              <li><strong>UTM:</strong> 31T 430959.5858286716 4583866.770942634</li>
              <li><strong>DD:</strong> 38.8897,-77.008</li>
              <li><strong>DMS:</strong> 38°53'22.92"N 77°0'28.8"W</li>
              <li><strong>DM:</strong> 38°53.38200', -077°00.48000'</li>
            </ul>
          </div>
        </Modal>
      </span>
    )
  }
}

export default withStyles(styles)(Help)
