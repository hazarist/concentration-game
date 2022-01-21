import React, { useContext } from "react";
import GameBoard from "../../components/GameBoard/GameBoard.jsx";
import _ from "lodash";
import { list } from "../../cardList/animals";
import { GameContext } from "../../context/GameContextProvider.jsx";

function GamePlay() {
  const { state } = useContext(GameContext);
  const boardSize = list.slice(0, state.boardSize ** 2 / 2);
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Concentration Memorize Game</h1>
          <GameBoard
            size={state.boardSize}
            players={state.mode}
            cardList={_.shuffle([
              ...boardSize,
              ...boardSize
            ])}
          />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
