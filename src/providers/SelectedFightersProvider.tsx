import * as React from "react";

type Action =
  | { type: "select"; id: number }
  | { type: "delete"; id: number }
  | { type: "delete all" }
  | {
      type: "update";
      newState: State;
    };
type Dispatch = (action: Action) => void;
type State = {
  fighters: { id: number; isSelected: boolean; cost: number }[];
};
type SelectedFightersProviderProps = { children: React.ReactNode };

const SelectedFightersStateContext = React.createContext<State | undefined>(
  undefined
);
const SelectedFightersDispatchContext = React.createContext<
  Dispatch | undefined
>(undefined);

function SelectedFightersReducer(state: State, action: Action): State {
  switch (action.type) {
    case "select": {
      return {
        fighters: state.fighters.map((fighterSelection) =>
          fighterSelection.id !== action.id
            ? fighterSelection
            : { ...fighterSelection, isSelected: true}
        ),
      };
    }
    case "delete": {
      return {
        fighters: state.fighters.map((fighterSelection) =>
          fighterSelection.id !== action.id
            ? fighterSelection
            : { ...fighterSelection, isSelected: false }
        ),
      };
    }
    case "delete all": {
      return {
        fighters: state.fighters.map((fighterSelection) =>
            ({...fighterSelection, isSelected: false }) 
        ),
      };
    }
    case "update": {
      return action.newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function SelectedFightersProvider({ children }: SelectedFightersProviderProps) {
  const [state, dispatch] = React.useReducer(SelectedFightersReducer, {
    fighters: [],
  });
  return (
    <SelectedFightersStateContext.Provider value={state}>
      <SelectedFightersDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedFightersDispatchContext.Provider>
    </SelectedFightersStateContext.Provider>
  );
}

function useSelectedFightersState() {
  const context = React.useContext(SelectedFightersStateContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedFightersState must be used within a SelectedFightersProvider"
    );
  }
  return context;
}

function useSelectedFightersDispatch() {
  const context = React.useContext(SelectedFightersDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedFightersDispatch must be used within a SelectedFightersProvider"
    );
  }
  return context;
}

export {
  SelectedFightersProvider,
  useSelectedFightersState,
  useSelectedFightersDispatch,
};
