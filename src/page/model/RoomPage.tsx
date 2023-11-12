import { glagol } from '../../shared/conference/glagol';
import React, { useEffect, useRef } from 'react';
import '../../widgets/styles/index.scss';
import { RemoteStreamsBox } from '../../widgets/layers/RemoteStreamsBox';
import { Box } from '@mui/material';
import { LocalStream } from '../../widgets/layers/Localstream';
import { Toolbox } from '../../widgets/layers/Toolbox';
import { ChatsBox } from '../../widgets/layers/ChatsBox';
import { TopPanel } from '../../widgets/layers/TopPanel';
import { useDispatch } from 'react-redux';
import { addRemoteTrack, addSharing, removeRemoteTrack, removeSharing } from '../../app/store/sourceSlice';

function RoomPage() {
  const refVideo = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();

  function render() {

  }


  useEffect(() => {
    glagol.roomInstance.create();
    glagol.on('addTrackToSource', addTrackToSource);
    glagol.on('addSharingToSource', addSharingToSource);
    glagol.on('removeSharingFromSource', removeSharingFromSource);
    glagol.on('removeRemoteTrackFormSource', removeRemoteTrackFormSource);
    glagol.on('renderMySharing', renderMySharing);
    const stream = new MediaStream();
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.sender.track?.kind === 'video') {
        stream.addTrack(transceiver.sender.track);
      }
    });
    if (refVideo.current !== null) {
      refVideo.current.srcObject = stream;
    }
  }, []);

  function addTrackToSource(id?: string) {
    if (id) dispatch(addRemoteTrack(id));
  }

  function addSharingToSource(id?: string) {
    if (id) {
      dispatch(addSharing(id[0]));
    }
  }

  function removeSharingFromSource() {
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((stream) => {
        if (refVideo.current !== null) refVideo.current.srcObject = stream;
      });
    });
  }

  function removeRemoteTrackFormSource() {
    dispatch(removeSharing());
  }

  function renderMySharing() {
    const stream = new MediaStream;
    glagol.peerConnection.getTransceivers().forEach((transceiver) => {
      if (transceiver.sender.track?.contentHint === 'detail') {
        stream.addTrack(transceiver.sender.track);
      }
      if (refVideo.current !== null) refVideo.current.srcObject = stream;
    });
  }

  return <Box sx={{
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: 10
  }
  } display="flex">
    <TopPanel/>
    <LocalStream ref={refVideo}/>
    <RemoteStreamsBox/>
    <ChatsBox/>
    <Toolbox/>
  </Box>;
}

export { RoomPage };
