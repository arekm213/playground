import ScreenOrientationExpoModule from './ScreenOrientationExpoModule';
import { useEvent } from 'expo';

export const useScreenOrientation = () => {
    const payload = useEvent(ScreenOrientationExpoModule, 'onScreenOrientationChange');
    return payload?.orientation ?? ScreenOrientationExpoModule.getScreenOrientation();
}
