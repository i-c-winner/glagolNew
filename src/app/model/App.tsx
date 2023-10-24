import { xmpp } from '../../features/conference/xmpp';
import { Room } from '../../features/room/room';
import {Provider} from 'react-redux';
import { store } from '../store/store';
import { Loginin } from '../../page/model/Loginin';


console.log('APp');
const room = new Room(xmpp);
xmpp.init(room);
function App() {
  console.log('APp 01');

  return <Provider store={store}>
    <Loginin />
  </Provider>;
}

export { App };
