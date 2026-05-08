import { useEffect, useState } from 'react';
import ScreenOrientationExpoModule from './ScreenOrientationExpoModule';
import { useEvent } from 'expo';

export const useScreenOrientation = () => {
    const [screenOrientation, setScreenOrientation] = useState(ScreenOrientationExpoModule.getScreenOrientation());
    const onScreenOrientationChangePayload = useEvent(ScreenOrientationExpoModule, 'onScreenOrientationChange');

    useEffect(()=> {
        if(onScreenOrientationChangePayload?.orientation){
            setScreenOrientation(onScreenOrientationChangePayload.orientation);
        }
    },[onScreenOrientationChangePayload]);

    return screenOrientation;
}