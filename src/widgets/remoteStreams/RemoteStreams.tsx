import { useEffect, useRef } from "react";
import { glagol } from "../../entities/glagol/glagol";
import { Card, CardMedia } from '@mui/material';
import { PeerConnection } from '../../entities/conference/peerConnection';

function RemoteStreams(props: { streamId: string }) {
  const refVideo = useRef<any>(null);
  useEffect(() => {
    glagol.currentStreams[props.streamId].stream.getTracks().forEach((track)=>{
      if (track.kind==='video') {
        refVideo.current.srcObject=glagol.currentStreams[props.streamId].stream
      }
    })

  }, [props.streamId]);
  return (
      <Card sx={
        {
          width: '320px',
          flexShrink: '0'
        }
      }>
        <CardMedia sx={{
          width: '300px'
        }}>
          <video className='video__remoutstream' autoPlay={true} ref={refVideo}/>
        </CardMedia>
      </Card>
  );
}

export { RemoteStreams };
