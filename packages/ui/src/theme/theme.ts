type Typography = {
  family?: string;
  size?: number;
  spacing?: number;
  weight?: string;
  upperCase?: boolean;
};

type Theme = {
  typography: {
    Jumbo: Typography;
    Title2: Typography;
    Title1: Typography;
    Body1: Typography;
    Caption: Typography;
    Overline: Typography;
    Link: Typography;
  }
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
    family?: string;
    baseSize: number;
  };
}

export { Theme, Typography };
