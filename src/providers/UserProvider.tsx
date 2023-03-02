import * as React from "react";
import { AuthorizeResult } from "../request/api/user/getCurrentUser";
import { Api } from "../request/api/api";

type Action =
  | { type: "register" }
  | { type: "logout" }
  | { type: "setUser"; data: AuthorizeResult };
type Dispatch = (action: Action) => void;
type State = AuthorizeResult;
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<State | undefined>(undefined);
const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

async function getCurrentUser(dispatch: Dispatch) {
  Api.user.getCurrentUser().then((data) => {
    dispatch({ type: "setUser", data: data });
  });
}

function userControlReducer(state: State, action: Action): State {
  switch (action.type) {
    case "logout": {
      Api.user.logout();
      return { authorized: false };
    }
    case "setUser": {
      return { authorized: action.data.authorized, user: action.data.user };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(userControlReducer, {
    authorized: false,
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useDrawerState must be used within a DrawerProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useDrawerDispatch must be used within a DrawerProvider");
  }
  return context;
}

export { UserProvider, useUserDispatch, useUserState, getCurrentUser };
