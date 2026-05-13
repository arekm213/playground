import { useEffect, useState } from "react";
import { ColorScheme } from "./NativeColorScheme";
import { getColorScheme, onSchemeChange } from "./appearance.native";

export function useColorScheme(): ColorScheme | null {
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(() => getColorScheme());

  useEffect(() => {
    setColorScheme(getColorScheme());
    const subscription = onSchemeChange((pair) => setColorScheme(pair.value));
    return () => subscription.remove();
  }, []);

  return colorScheme;
}
