import React, { useEffect, useState } from "react";
import GameBoard from "../../components/GameBoard/GameBoard.jsx";
import _ from "lodash";
import useQuery from "../../hooks/useQuery.js";
import { useHistory } from "react-router-dom";
import { list } from "../../cardList/animals";

function GamePlay() {
  const query = useQuery();
  const history = useHistory();
  const [size, setSize] = useState(null);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    let _size = Number.parseInt(query.get("size"));
    let _player = Number.parseInt(query.get("players"));

    if (
      (_size !== 4 && _size !== 6 && _size !== 8) ||
      (_player !== 1 && _player !== 2 && _player !== 3)
    )
      history.push("/");

    if (_.isNumber(_size)) setSize(_size);
    if (_.isNumber(_player)) setPlayers(_player);
  }, [query, history]);

  return (
    size && (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Concentration Memorize Game</h1>
            <GameBoard
              size={size}
              players={players}
              cardList={_.shuffle([
                ...list.slice(0, (size * size) / 2),
                ...list.slice(0, (size * size) / 2)
              ])}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default GamePlay;
