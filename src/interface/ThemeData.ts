export interface ThemeData {
  data: {
    [key: string]: {
      id: string;
      name: string;
      colors: {
        body: string;
        text: string;
        button: {
          text: string;
          background: string;
        };
        link: {
          text: string;
          opacity: number;
        };
      };
      font: string;
    };
  };
}

export interface TypeTheme {
  [key: string]: string | object;
  id: string;
  name: string;
  colors: {
    body: string;
    text: string;
    button: {
      text: string;
      background: string;
    };
    link: {
      text: string;
      opacity: number;
    };
  };
  font: string;
}
