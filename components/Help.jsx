import React from 'react'
import { Modal, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import HelpIcon from '@mui/icons-material/Help'

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

    const HelpDiv = styled('div')(
      ({ theme }) => `
      background-color: ${theme.palette.background.paper};
      position: absolute;
      width: ${theme.spacing(50)};
      padding: ${theme.spacing(4)};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    )

    return (
      <span>
        <IconButton onClick={this.handleOpen}>
          <HelpIcon/>
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <HelpDiv>
          Enter name of a location or coordinates in one of these formats:
            <ul>
              <li><strong>UTM:</strong> 31T 430959.5858286716 4583866.770942634</li>
              <li><strong>DD:</strong> 38.8897,-77.008</li>
              <li><strong>DMS:</strong> 38°53'22.92"N 77°0'28.8"W</li>
              <li><strong>DM:</strong> 38°53.38200', -077°00.48000'</li>
            </ul>
          </HelpDiv>
        </Modal>
      </span>
    )
  }
}

export default Help
