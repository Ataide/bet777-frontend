import { createContext, PropsWithChildren, useState } from "react";

interface ILayoutContextProps {
  title: string | null;
  drawerWidth?: number;
  setTitle: (title: string) => void;
}
export const LayoutContext = createContext<ILayoutContextProps>(
  {} as ILayoutContextProps
);

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [title, _setTitle] = useState<string | null>(null);

  const drawerWidth = 299;

  const setTitle = (_title) => {
    _setTitle(_title);
  };

  return (
    <LayoutContext.Provider value={{ title, setTitle, drawerWidth }}>
      {children}
    </LayoutContext.Provider>
  );
};
