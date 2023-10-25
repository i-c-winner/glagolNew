import { useEffect, useRef, useState } from 'react';
import { getRandomText } from '../../features/plugins/getRandomText';
import { conference } from '../../features/conference/conference';

function Loginin() {
  const [ params, setParams ] = useState({
    roomName: getRandomText(5),
    userNode: getRandomText(5),
    displayName: getRandomText(5)
  });
  const refLogin = useRef<HTMLInputElement>(null);
  const refRoom = useRef<HTMLInputElement>(null);

  function changeLogin(event: any) {
    if (refLogin.current !== null) {
      setParams(() => {
        return {
          ...params,
          displayName: event.target.value
        };
      });
    }
  }

  function changeRoom(event: any) {
    if (refRoom !== null) {
      setParams(() => {
        return {
          ...params,
          roomName: event.target.value
        };
      });
    }
  }

  function logininFunc() {
    conference.inizialization(params);
    console.log(conference)
  }
useEffect(()=>{

},[])
  return (
    <div>
      <>displayName</>
      <input ref={refLogin} onChange={changeLogin}/>
      <p>room</p>
      <input ref={refRoom} onChange={changeRoom}/>
      <button onClick={logininFunc}>click</button>
    </div>
  );
}

export { Loginin };
