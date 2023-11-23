import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IBet, IPaper } from "../types";
import { useStateContext } from ".";

interface IAppContextProps {
  paper: IPaper | null;
  addBetToPaper: (bet: IBet) => void;
  removeBetFromPaper: (bet: IBet) => void;
  updateOnlyProfit: (profit: number) => void;
  updatePaperAmount: (value: number) => void;
  clearPaper: () => void;
}
export const AppContext = createContext<IAppContextProps>(
  {} as IAppContextProps
);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const [paper, _setPaper] = useState<IPaper>({
    user_id: user ? +user.id : 0,
    bets: [],
    amount: 0,
    rate: 0,
    profit: 0,
  });

  const addBetToPaper = (_bet: IBet) => {

    const alreadyGameInPaper = paper.bets.some(
      (bet) => bet.game_id === _bet.game_id
    );

    if (alreadyGameInPaper) {
      return;
    }

    _setPaper({
      ...paper,
      rate: Number((paper.rate + _bet.rate).toFixed(2)),
      bets: [...paper.bets, _bet],
      quantity: paper.bets.length + 1,
    });

    // updatePaperAmount(paper.amount);
  };

  const removeBetFromPaper = (_bet: IBet) => {
    const new_rate = Number((paper.rate - _bet.rate).toFixed(2));
    _setPaper({
      ...paper,
      rate: new_rate,
      profit: Number((paper.amount * new_rate).toFixed(2)),
      bets: paper.bets.filter((bet) => bet !== _bet),
      quantity: paper.bets.length - 1,
    });
  };

  const updatePaperAmount = (amount_value: number) => {
    _setPaper({
      ...paper,
      amount: amount_value,
      profit: amount_value * paper.rate,
    });
  };

  const updateOnlyProfit = (profit: number) => {
    _setPaper({
      ...paper,
      profit: profit,
    });
  };

  const clearPaper = () => {
    _setPaper({
      user_id: user ? +user.id : 0,
      bets: [],
      amount: 0,
      rate: 0,
      profit: 0,
    });
  };

  // useEffect(() => {


  // }, [paper]);

  return (
    <AppContext.Provider
      value={{
        paper,
        addBetToPaper,
        removeBetFromPaper,
        updatePaperAmount,
        updateOnlyProfit,
        clearPaper,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
