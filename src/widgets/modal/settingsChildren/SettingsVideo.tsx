import { ISettingsProps } from '../../types';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch } from 'react-redux';
import {changeQuantityVideo} from '../../../app/store/configSlice';

const qualityVideo = {
  HEIGHT: "Высокое",
  MIDDLE: "Среднее",
  LOW: "Низкое"
};

function SettingsVideo(props: ISettingsProps) {
  const dispatch=useDispatch()
  function changeButton(event: any) {
    dispatch(changeQuantityVideo(event.target.value))
  }

  const { value, index } = props;
  return value === index && (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Качество видео</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        /**
        *DO TO Необходимо определить начальное качество видео в
        зависимости от настроек
        */
        defaultValue={qualityVideo.MIDDLE}
        name="radio-buttons-group"
        onChange={changeButton}
      >
        <FormControlLabel value={'VIDEO_HEIGHT'} control={<Radio/>} label={qualityVideo.HEIGHT}/>
        <FormControlLabel value={'VIDEO_MIDDLE'} control={<Radio/>} label={qualityVideo.MIDDLE}/>
        <FormControlLabel value={'VIDEO_LOW'} control={<Radio/>} label={qualityVideo.LOW}/>
        <FormControlLabel value="disabledVideo" control={<Radio/>} label="disable video"/>
      </RadioGroup>
    </FormControl>
  );
}

export { SettingsVideo };
