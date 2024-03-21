import { useEffect, useState } from "react";
import { getFromLS, setToLS } from "../utils/storage";
import { ThemeData, TypeTheme } from "../interface/ThemeData";
import _ from "lodash";

export const useTheme = () => {
  const themes: ThemeData | null = getFromLS("all-themes");
  const initialTheme =
    themes !== null && themes.data ? themes.data.seaWave : null;
  const [theme, setTheme] = useState<TypeTheme | null>(initialTheme);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);

  const setMode = <T>(mode: T) => {
    setToLS("theme", mode);
    setTheme(mode as TypeTheme);
  };
  const getFonts = () => {
    const allFonts =
      themes !== null && themes.data
        ? _.values(_.mapValues(themes.data, "font"))
        : null;
    return allFonts;
  };
  useEffect(() => {
    const localTheme: TypeTheme | null = getFromLS("theme");
    // localTheme ? setTheme(localTheme) : setTheme(themes.data.light);

    localTheme && themes ? setTheme(localTheme) : setTheme(initialTheme);
    setThemeLoaded(true);
  }, []);
  return { theme, themeLoaded, setMode, getFonts };
};
