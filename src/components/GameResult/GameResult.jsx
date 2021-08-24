import React from "react";
import { Link } from "react-router-dom";

function GameResult({ size, player, players }) {
  return (
    <div className="d-flex flex-column h-100 mt-5">
      <h2>Game Over</h2>
      <h4 className="mt-3">The winner is {player}</h4>
      <div className="d-flex justify-content-center p-2">
        <Link className="p-2" to={`/`}>
          Return home
        </Link>
      </div>
    </div>
  );
}

export default GameResult;
