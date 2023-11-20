import { useStateContext } from "../contexts";

export const useAuthUser = () => {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser!;
  return { user: user };
};
