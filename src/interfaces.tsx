export interface IPlace {
  id?: number;
  name: string;
  address: string;
}

export interface IProfessional {
  name: string;
  email: string;
}

export interface IBetWithOdds {
  id: number;
  gameType: number;
  gameTitle: string;
  oddTitle: string;
  oddPlayer: string;
  odd: number;
}
