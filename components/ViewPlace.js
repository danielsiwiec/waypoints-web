import Map from './Map'
import SendButton from './SendButton'
import BackButton from './BackButton'
import {Input} from 'material-ui'
import {Grid} from 'material-ui'

export default (props) => (
  <Grid container justify='center'>
    <Grid item xs={12}>
      <Map place={props.place} onDragEnd={props.onDragEnd} />
    </Grid>
    <Grid item>
      <Input value={props.place.name} onChange={props.onNameChange} />
    </Grid>
    <Grid item>
      <SendButton onClick={props.onSend} />
      <BackButton onClick={props.onBack}/>
    </Grid>
  </Grid>
)