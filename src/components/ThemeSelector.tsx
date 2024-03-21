import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useTheme } from "../theme/useTheme";
import { getFromLS } from "../utils/storage";
import { ThemeData, TypeTheme } from "../interface/ThemeData";

const ThemedButton = styled.button`
  border: 0;
  display: inline-block;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 5px;
  width: 100%;
  cursor: pointer;
`;

const Wrapper = styled.li`
  padding: 48px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #000;
  list-style: none;
`;

const Container = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 3rem;
  padding: 10px;
`;

const Header = styled.h2`
  display: flex;
  justify-content: space-around;
`;

interface Props {
  setter: (theme: TypeTheme) => void;
  newTheme?: TypeTheme;
}

const ThemeSelector: React.FC<Props> = (props) => {
  const themesFromStore: ThemeData = getFromLS("all-themes") as ThemeData;
  const [data, setData] = useState(themesFromStore.data);
  const [themes, setThemes] = useState<string[]>([]);
  const { setMode } = useTheme();

  const themeSwitcher = (selectedTheme: TypeTheme) => {
    console.log(selectedTheme);
    setMode(selectedTheme);
    props.setter(selectedTheme);
  };

  useEffect(() => {
    setThemes(_.keys(data));
  }, [data]);

  useEffect(() => {
    props.newTheme && updateThemeCard(props.newTheme);
  }, [props.newTheme]);

  const updateThemeCard = (theme: TypeTheme) => {
    const key = _.keys(theme)[0];
    const updated = { ...data, [key]: theme[key] };

    type NewData = {
      [key in keyof typeof data]: (typeof data)[key];
    };

    setData(updated as NewData);

    // other way
    //const updatedData = updated as { [key: string]: { id: string; name: string; colors: { body: string; text: string; button: { text: string; background: string; }; link: { text: string; opacity: number; }; }; font: string; } };
    //setData(updatedData);
  };

  const ThemeCard: React.FC<{ theme: TypeTheme }> = ({ theme }) => {
    return (
      <Wrapper
        style={{
          backgroundColor: `${theme.colors.body}`,
          color: `${theme.colors.text}`,
          fontFamily: `${theme.font}`,
        }}
      >
        <span>Click on the button to set this theme</span>
        <ThemedButton
          onClick={() => themeSwitcher(theme)}
          style={{
            backgroundColor: `${theme.colors.button.background}`,
            color: `${theme.colors.button.text}`,
            fontFamily: `${theme.font}`,
          }}
        >
          {theme.name}
        </ThemedButton>
      </Wrapper>
    );
  };

  return (
    <div>
      <Header>Select a Theme from below</Header>
      <Container>
        {themes.length > 0 &&
          themes.map((theme) => (
            <ThemeCard theme={data[theme]} key={data[theme].id} />
          ))}
      </Container>
    </div>
  );
};

export default ThemeSelector;
