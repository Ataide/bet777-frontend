import { createContext, PropsWithChildren, useState } from "react";

interface ILayoutContextProps {
  title: string | null;
  openLogin: boolean;
  openRegister: boolean;
  drawerWidth?: number;
  righrDrawerWidth: number;
  setTitle: (title: string) => void;
  setOpenLogin: (open: boolean) => void;
  setOpenRegister: (open: boolean) => void;
}
export const LayoutContext = createContext<ILayoutContextProps>(
  {} as ILayoutContextProps
);

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [title, _setTitle] = useState<string | null>(null);
  const [openLogin, _setOpenLogin] = useState<boolean>(false);
  const [openRegister, _setOpenRegister] = useState<boolean>(false);

  const drawerWidth = 299;

  const righrDrawerWidth = 374;

  const setTitle = (_title) => {
    _setTitle(_title);
  };

  const setOpenLogin = (_open) => {
    _setOpenLogin(_open);
  };

  const setOpenRegister = (_open) => {
    _setOpenRegister(_open);
  };

  return (
    <LayoutContext.Provider
      value={{
        title,
        setTitle,
        openLogin,
        openRegister,
        setOpenLogin,
        setOpenRegister,
        drawerWidth,
        righrDrawerWidth,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
