import { authApi } from "../api/authApi";
import { GenericResponse } from "../api/types";
import { IBet, IPaper } from "../types";

export const insertPaper = async (paper: IPaper | null) => {
  const response = await authApi.post<GenericResponse>("api/paper", paper);
  return response.data;
};

export const getOpenPapersFn = async () => {
  const response = await authApi.get<IPaper[]>("api/paper?status=-1");
  //console.log(response);
  return response.data;
};

export const getClosedPapersFn = async () => {
  const response = await authApi.get<IPaper[]>("api/paper?status=1");
  //console.log(response);
  return response.data;
};
