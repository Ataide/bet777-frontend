import { BetResult, TransactionStatus } from "./enums";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface Event {
  id?: number;
  title: string;
  sport: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  games: Game[];
}
export interface IGameWithEvent extends Game {
  title: string;
  end_date: string;
}
export interface Game {
  id?: number;
  event_id: number;
  home_name: string;
  home_image: string;
  away_image: string;
  away_name: string;
  home_rate: number;
  draw_rate: number;
  away_rate: number;
  home_score: number;
  away_score: number;
  time_close_bet: string;
  time_start: string;
  time_end: string;
  done: boolean;
  result: string;
}
export interface IPaper {
  user_id: number;
  quantity?: number;
  rate: number;
  profit: number;
  amount: number;
  bets: IBet[];
  created_at?: string;
  result?: BetResult;
}

export interface IWallet {
  id?: number;
  amount: number;
  bet_total: number;
  draw_total: number;
}

export interface ITransaction {
  status: TransactionStatus;
  id: number;
  user_id: number;
  type: string;
  withdraw: number;
  deposit: number;
  created_at: string;
}

export interface IBet {
  game_id?: number;
  players?: string;
  bet_choice: number;
  game?: Game;
  bet_choice_name: string;
  rate: number;
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

export type IProfitRequest = {
  profit: number;
};

export type IBetRequest = {
  quantity?: number;
  amount: string;
  profit?: number;
};
