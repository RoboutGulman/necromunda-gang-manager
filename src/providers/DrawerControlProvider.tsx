import * as React from "react";

type Action = { type: "change" };
type Dispatch = (action: Action) => void;
type State = { isOpen: boolean };
type DrawerProviderProps = { children: React.ReactNode };

const DrawerStateContext = React.createContext<State | undefined>(undefined);
const DrawerDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function drawerControlReducer(state: State, action: Action): State {
  switch (action.type) {
    case "change": {
      return { isOpen: !state.isOpen };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function DrawerControlProvider({ children }: DrawerProviderProps) {
  const [state, dispatch] = React.useReducer(drawerControlReducer, {
    isOpen: false,
  });
  return (
    <DrawerStateContext.Provider value={state}>
      <DrawerDispatchContext.Provider value={dispatch}>
        {children}
      </DrawerDispatchContext.Provider>
    </DrawerStateContext.Provider>
  );
}

function useDrawerState() {
  const context = React.useContext(DrawerStateContext);
  if (context === undefined) {
    throw new Error("useDrawerState must be used within a DrawerProvider");
  }
  return context;
}

function useDrawerDispatch() {
  const context = React.useContext(DrawerDispatchContext);
  if (context === undefined) {
    throw new Error("useDrawerDispatch must be used within a DrawerProvider");
  }
  return context;
}

export { DrawerControlProvider, useDrawerState, useDrawerDispatch };
