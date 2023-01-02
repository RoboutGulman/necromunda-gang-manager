import * as React from "react";
import * as api from "../request/methods/user/getCurrentUserByToken";
import * as login from "../request/methods/user/login";

type Action =
  | { type: "register" }
  | { type: "login"; result: boolean }
  | { type: "logout" }
  | { type: "setUser"; data: api.ApiMethods.AuthorizeResult };
type Dispatch = (action: Action) => void;
type State = api.ApiMethods.AuthorizeResult;
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = React.createContext<State | undefined>(undefined);
const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

async function logInUser(
  dispatch: Dispatch,
  user: { username: string; password: string }
): Promise<boolean> {
  try {
    const result = await login.ApiMethods.login(user);
    dispatch({ type: "login", result });
    return result;
  } catch (error) {
    return false;
  }
}

async function getCurrentUser(dispatch: Dispatch) {
  api.ApiMethods.getCurrentUser().then((data) => {
    dispatch({ type: "setUser", data: data });
    //setUserAuthorized(data.authorized);
    console.log(data);
  });
}

function userControlReducer(state: State, action: Action): State {
  switch (action.type) {
    case "login": {
      return { authorized: action.result };
    }
    case "logout": {
      return { authorized: false };
    }
    case "setUser": {
      return action.data;
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

export {
  UserProvider,
  useUserDispatch,
  useUserState,
  getCurrentUser,
  logInUser,
};
