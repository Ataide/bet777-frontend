import { IBet } from "../types";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const dateRegex = new RegExp(
  /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/i
);

export function toCamelCase(string) {
  return string
    .split(" ")
    .map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

export const getAgeFrom = (DOB) => {
  const today = new Date();
  const [day, month, year] = DOB.split("/");
  const birthDate = new Date(`${year}-${month}-${day}`);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const formatter = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const getPalpitesFromBet = (bets: IBet[]) => {
  const choices = bets.map((bet) => {
    switch (bet.bet_choice) {
      case 0:
        return "Empate, ";
      case 1:
        return bet.game.home_name + ", ";
      case -1:
        return bet.game.away_name + ", ";
      default:
        break;
    }
  });
  return choices;
};
