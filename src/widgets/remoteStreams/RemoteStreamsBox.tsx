import { glagol } from '../../shared/conference/glagol';
import {getRemoteTransceivers} from '../../features/room/streams';
import { useEffect, useState } from 'react';
import { RemoteStream } from './RemoteStream';
import { Box } from '@mui/material';
import {styles} from '../styles/styles';

const {remoteBox}=styles
function RemoteStreamsBox(props: {transceivers: RTCRtpTransceiver[]}) {
  return <Box sx={remoteBox}>
    {props.transceivers.map((transceiver)=>{
      return <RemoteStream key={transceiver.receiver.track.label} transceiver={transceiver} />
    })}
  </Box>
}
export {RemoteStreamsBox}
