interface Theme {
  colors: {
    primary: string;
    destructive: string;
    icon: string;
    input: string;
    secondary: string;
    background: string;
    shadow: string;
    shade: string;
    text: string;
    textShade: string;
  };
  sizes: {
    corners: number;
    icons: number;
  };
  margins: {
    small: number;
    medium: number;
    large: number;
  };
  font: {
    baseSize: number;
  };
}

export { Theme };
