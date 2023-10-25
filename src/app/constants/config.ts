import { getRandomText } from '../../features/plugins/getRandomText';
import { IConfig } from '../types';

const config: IConfig = {
  conference: {
    user: {
      roomName: getRandomText(5),
      userName: getRandomText(5),
      userNode: '',
      displayName: getRandomText(5)
    },
    loginin: false
  }
};

export { config };
