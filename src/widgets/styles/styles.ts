const styles = {
  topPanelLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-20',
    pointerEvents: 'none'
  },
  remoteStreamLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-30',
    display: 'flex',
    flexFlow: 'row-reverse',
    pointerEvents: 'none',
    wrapper: {
      backgroundColor: 'rgba(25, 25, 25, .3)',
      boxShadow: '0 0 5px 5px green',
      width: '350px',
      height: '99vh'
    }
  },
  remoteStream: {
    width: '90%',
    boxShadow: '0 0 5px 5px green',
    backgroundColor: 'yellow',

  },
  localeStyle: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-40',
    bgcolor: 'background.paper'
  },
  chatsboxLayer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-10',
    pointerEvents: 'none',
    chatsbox: {
      backgroundColor: 'rgba(25, 25, 25, .3)',
      height: '100vh',
      width: '300px'
    }
  },

  toolboxLayer: {
    pointerEvents: 'none',
    display: 'flex',
    flexFlow: 'column-reverse',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    textAlign: 'bottom',
    toolbox: {
      pointerEvents: 'initial',
      height: '40px',
      padding: '5px 20px',
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: 'background.windows'
    }
  }


};
export { styles };
