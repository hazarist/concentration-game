import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../context/GameContextProvider";

function GameInitialize() {
  const { dispatch } = useContext(GameContext);

  return (
    <div className="d-flex flex-column vh-100">
      <h1 className="mb-5">Welcome to Concentration Memorize Game</h1>
      <p className="mb-5">Start the game and get so much fun!</p>
      <div className="form-group">
        <label htmlFor="board-size-select">Board size</label>
        <select
          id="board-size-select"
          className="form-control w-25 m-auto mb-3"
          onChange={(event) =>
            dispatch({
              type: "setBoardSize",
              value: event.target.value
            })
          }
        >
          <option value={4}>4X4 Board</option>
          <option value={6}>6X6 Board</option>
          <option value={8}>8X8 Board</option>
        </select>
        <label htmlFor="player-number-select">Players</label>
        <select
          id="player-number-select"
          className="form-control w-25 m-auto mb-3"
          onChange={(event) =>
            dispatch({ type: "setMode", value: event.target.value })
          }
        >
          <option value={1}>1 player</option>
          <option value={2}>2 players</option>
          <option value={3}>3 players</option>
        </select>
        <Link to={"/play"}>Play</Link>
      </div>
    </div>
  );
}

export default GameInitialize;
