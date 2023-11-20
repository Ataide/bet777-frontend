import { authApi } from "../api/authApi";
import { GenericResponse } from "../api/types";
import { IDepositInput } from "../pages/account/deposit";
import { IWithdrawInput } from "../pages/account/withdraw";
import { ITransaction, IWallet } from "../types";

export const depositToWalletFn = async (deposit: IDepositInput | null) => {
  const response = await authApi.put<GenericResponse>(
    "api/wallet/" + deposit?.wallet_id,
    deposit
  );
  return response.data;
};

export const withdrawWalletFn = async (withdraw: IWithdrawInput | null) => {
  const response = await authApi.put<GenericResponse>(
    "api/wallet/" + withdraw?.wallet_id,
    withdraw
  );
  return response.data;
};

export const getWalletFn = async () => {
  const response = await authApi.get<IWallet>("api/wallet");
  return response.data;
};

export const getWalletTransactionsFn = async (type: string | null) => {
  const response = await authApi.get<ITransaction[]>("api/transactions", {
    params: { type: type },
  });
  return response.data;
};
