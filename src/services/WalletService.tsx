import { Dayjs } from "dayjs";
import { authApi } from "../api/authApi";
import { GenericResponse, IResponseDeposit } from "../api/types";
import { IDepositInput } from "../pages/account/deposit";
import { IWithdrawInput } from "../pages/account/withdraw";
import { ITransaction, IWallet } from "../types";

export const depositToWalletFn = async (deposit: IDepositInput | null) => {
  const response = await authApi.put<IResponseDeposit>(
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

export const checkTransactionCompleteFn = async (
  payment_id: string | undefined
) => {
  const response = await authApi.get<GenericResponse>(
    "api/transactions/check/" + payment_id
  );
  return response.data;
};

export const getWalletTransactionsFn = async (
  type: string | null,
  date: Dayjs | null
) => {
  const response = await authApi.get<ITransaction[]>("api/transactions", {
    params: { type: type, date: date },
  });
  return response.data;
};
