import { useEffect, useRef, useState } from "react";
import { ColorScheme, KeyValuePair } from "./NativeAppearance";
import { getColorScheme, onSchemeChange } from "./appearance.native";
import { EventSubscription } from "react-native";

export function useColorScheme(): ColorScheme | null {
   const [colorScheme, setColorScheme] = useState<ColorScheme | null>(getColorScheme());
   const listenerSubscription = useRef<null | EventSubscription>(null);
  
   useEffect(() => {
    const schemeChangeHandler = (pair: KeyValuePair) => {
      setColorScheme(pair.value);
    }
    listenerSubscription.current = onSchemeChange(schemeChangeHandler);
    return  () => {
      listenerSubscription.current?.remove();
      listenerSubscription.current = null;
    }
   }, [])
   return colorScheme
}
