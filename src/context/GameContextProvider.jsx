import React, { useReducer } from "react";
export const GameContext = React.createContext();

function gameReducer(state, action) {
  switch (action.type) {
    case "setBoardSize": {
      return { ...state, boardSize: action.value };
    }
    case "setMode": {
      return { ...state, mode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const gameInitValues = {
  boardSize: 4,
  mode: 1
};

export function GameContextProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, gameInitValues);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
