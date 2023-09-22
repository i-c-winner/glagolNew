import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react';
import { Header } from '../panels/Header';
import { Toolbox } from '../panels/Toolbox';
import { useEffect, useRef } from 'react';
import { glagol } from '../../entities/glagol/glagol';
import { useSelector } from 'react-redux';
import { RemoteStreams } from '../remoteStreams/RemoteStreams';
import { IRootState } from '../../app/types';


const qtyRows = 3;
const qtyColumns = 4;
const qtyScreens = qtyColumns * qtyRows;
const cells: number[] = [];
for (let i = 0; i < qtyScreens; i++) {
  cells.push(i);
}

function LocalStreamsBox() {
  const refVideo = useRef<HTMLVideoElement>(null);
  const refVideoByTileMode = useRef<HTMLVideoElement>(null);
  const { tile } = useSelector((state: IRootState) => state.config.UI);
  const { streamsId } = useSelector((state: IRootState) => state.streams);
  const [ source, setSource ] = useState(streamsId.slice(0, (qtyScreens - 1)));
  const [ page, setPage ] = useState(1);

  function changePage(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
    setSource(() => streamsId.slice(qtyScreens * (page - 1), (qtyScreens + page)));
  }

  function getMaxPages() {
    return Math.ceil(streamsId.length / qtyScreens) || 1;
  }

  useEffect(() => {
    setSource(() => {
      return streamsId.slice(qtyScreens * (page - 1), (qtyScreens + page));
    });
  }, [ streamsId ]);
  useEffect(() => {
    if (refVideo.current !== null) refVideo.current.srcObject = glagol.localStream;
    if (refVideoByTileMode.current !== null) refVideoByTileMode.current.srcObject = glagol.localStream;
  }, [ tile ]);
  return (
    <Box sx={{
      flexGrow: '1',
      position: 'relative',
    }}>
      <Header/>
      {tile ? <Box
        sx={{
          display: 'flex',
          paddingTop: '100px'
        }}>
        <video autoPlay={true} ref={refVideoByTileMode} className="video__localstream"/>
        <Box
          sx={{
            marginRight: '10px',
            height: 'calc(100vh - 170px)',
            top: '90px',
            left: '0',
            right: '0',
            bottom: '110px',
            display: 'grid',
            gridTemplateColumns: `repeat(${qtyColumns}, 1fr)`,
            gridTemplateRows: `repeat(${qtyRows}, 1fr)`
          }}
        >
          {cells.map((index) => {
            const value: string = source[index];
            return <Box
              key={index}
            >
              {value && <RemoteStreams streamId={value}/>}
            </Box>;
          })}
          {/*{source.map((id: string, index: number) => <RemoteStreams key={index} streamId={id}/>)}*/}
        </Box>
        {getMaxPages() > 1 && <Pagination
          onChange={changePage}
          sx={
            {
              position: 'absolute',
              bottom: '65px',
              justifyContent: 'center',
              display: 'flex',
              width: '100%'
            }
          }
          showFirstButton={true} showLastButton={true} variant="outlined" count={getMaxPages()} hidePrevButton
          hideNextButton/>}
      </Box> : <video autoPlay={true} ref={refVideo} className="video__bigscreen"/>}
      <Toolbox/>
    </Box>
  );
}

export { LocalStreamsBox };
