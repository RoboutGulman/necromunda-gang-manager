import * as React from "react";

type Action =
  | { type: "open-login" }
  | { type: "open-register" }
  | { type: "close" };
type Dispatch = (action: Action) => void;
type State = { whichDialogIsOpen: "None" | "Login" | "Register" };
type AuthDialogsProviderProps = { children: React.ReactNode };

const AuthDialogsStateContext = React.createContext<State | undefined>(
  undefined
);
const AuthDialogsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function authDialogsControlReducer(state: State, action: Action): State {
  switch (action.type) {
    case "close": {
      return { whichDialogIsOpen: "None" };
    }
    case "open-login": {
      return { whichDialogIsOpen: "Login" };
    }
    case "open-register": {
      return { whichDialogIsOpen: "Register" };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function AuthDialogsControlProvider({ children }: AuthDialogsProviderProps) {
  const [state, dispatch] = React.useReducer(authDialogsControlReducer, {
    whichDialogIsOpen: "None",
  });
  return (
    <AuthDialogsStateContext.Provider value={state}>
      <AuthDialogsDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDialogsDispatchContext.Provider>
    </AuthDialogsStateContext.Provider>
  );
}

function useAuthDialogsState() {
  const context = React.useContext(AuthDialogsStateContext);
  if (context === undefined) {
    throw new Error("useDrawerState must be used within a DrawerProvider");
  }
  return context;
}

function useAuthDialogsDispatch() {
  const context = React.useContext(AuthDialogsDispatchContext);
  if (context === undefined) {
    throw new Error("useDrawerDispatch must be used within a DrawerProvider");
  }
  return context;
}

export {
  AuthDialogsControlProvider,
  useAuthDialogsState,
  useAuthDialogsDispatch,
};
