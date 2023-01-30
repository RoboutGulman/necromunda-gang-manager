import * as React from "react";

type Action =
  | { type: "select"; id: number; cost: number }
  | { type: "delete"; id: number; cost: number }
  | {
      type: "update";
      newState: { id: number; isSelected: boolean }[];
      newCost: number;
    };
type Dispatch = (action: Action) => void;
type State = {
  fighters: { id: number; isSelected: boolean }[];
  totalCost: number;
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
            : { id: action.id, isSelected: true }
        ),
        totalCost: state.totalCost + action.cost,
      };
    }
    case "delete": {
      return {
        fighters: state.fighters.map((fighterSelection) =>
          fighterSelection.id !== action.id
            ? fighterSelection
            : { id: action.id, isSelected: false }
        ),
        totalCost: state.totalCost - action.cost,
      };
    }
    case "update": {
      return {
        fighters: action.newState,
        totalCost: action.newCost,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function SelectedFightersProvider({ children }: SelectedFightersProviderProps) {
  const [state, dispatch] = React.useReducer(SelectedFightersReducer, {
    fighters: [],
    totalCost: 0,
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
