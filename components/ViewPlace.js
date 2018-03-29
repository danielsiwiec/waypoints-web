import Map from './Map'
import SendButton from './SendButton'

export default (props) => (
  <div>
  <Map place={props.place} onDragEnd={props.onDragEnd} />
    <SendButton onClick={props.onSend} />
    {/* add place name edit */}
  </div>
)