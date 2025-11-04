export interface Stat {
  number: string;
  label: string;
}

export interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  agree: boolean;
}

export interface ThemeClasses {
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
  };
  border: string;
}