export interface ILoginRequest {
  email: string;
  password: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IApiErrorResponse {
  status: number;
  errors: string[];
}

export type OptionType = {
  value: string;
  label: string;
};
