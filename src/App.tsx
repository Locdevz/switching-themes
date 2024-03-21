// import { useState } from 'react'
import ThemeBuilder from "./components/ThemeBuilder";
import styled, { ThemeProvider } from "styled-components";
import WebFont from "webfontloader";
import { GlobalStyles } from "./theme/GlobalStyles";
import { useTheme } from "./theme/useTheme";
import { TypeTheme } from "./interface/ThemeData";
import { useEffect, useState } from "react";
import ThemeSelector from "./components/ThemeSelector";

const Container = styled.div`
  margin: 100px auto 100px auto;
`;

interface Props {
  theme: TypeTheme | null;
  themeLoaded: boolean;
  getFonts: () => string[] | null;
}
function App() {
  const { theme, themeLoaded, getFonts }: Props = useTheme();
  const cTheme: TypeTheme | null = theme ? theme : null;
  const [selectedTheme, setSelectedTheme] = useState<TypeTheme | null>(cTheme);
  const [newTheme] = useState<TypeTheme | undefined>(undefined);
  useEffect(() => {
    setSelectedTheme(cTheme);
  }, [themeLoaded]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts() || [],
      },
    });
  });
  return (
    <>
      {themeLoaded && (
        <ThemeProvider theme={(selectedTheme as TypeTheme) || null}>
          <GlobalStyles />
          <Container
            style={{ fontFamily: selectedTheme?.font || "sans-serif" }}
          >
            <ThemeBuilder />
            <p>
              This is a theming system with a Theme Switcher and Theme Builder.
              Do you want to see the source code?{" "}
              <a href="https://github.com/atapas/theme-builder" target="_blank">
                Click here.
              </a>
            </p>
            <ThemeSelector setter={setSelectedTheme} newTheme={newTheme} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
