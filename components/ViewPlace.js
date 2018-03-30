import Map from './Map'
import SendButton from './SendButton'
import {Input} from 'material-ui'

export default (props) => (
  <div>
    <Map place={props.place} onDragEnd={props.onDragEnd} />
    <SendButton onClick={props.onSend} />
    <Input value={props.place.name} onChange={props.onNameChange} />
  </div>
)