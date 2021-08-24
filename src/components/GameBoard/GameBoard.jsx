import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import FlipCard from "../FlipCard/FlipCard.jsx";
import GameResult from "../GameResult/GameResult.jsx";
import ScoreBoard from "../ScoreBoard/ScoreBoard.js";
import "./style.css";

function GameBoard({ cardList = [], size, players }) {
  const [matchedList, setMatchedList] = useState([]);
  const [flippedList, setFlippedList] = useState([]);
  const [closeList, setCloseList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [activePlayerId, setActivePlayerId] = useState(0);
  const [round, setRound] = useState(0);

  const preparePlayerList = useCallback(() => {
    let _playerList = [];
    for (let index = 0; index < players; index++) {
      let _player = {
        id: index,
        name: `Player${index + 1}`,
        score: 0
      };
      _playerList.push(_player);
    }
    setPlayerList(_playerList);
  }, [players]);

  useEffect(() => {
    preparePlayerList();
  }, [preparePlayerList]);

  const setFlippedId = (order, id) => {
    // round counter
    if (flippedList[0]?.id !== id && flippedList.length === 1) {
      setRound(round + 1);
    }

    //match control
    if (flippedList[0]?.id === id && flippedList.length === 1) {
      setMatchedList([...matchedList, id]);

      // set score to the player
      let _playerList = playerList.map((x) => {
        if (activePlayerId === x.id) {
          x.score += 1;
        }
        return x;
      });
      setPlayerList([..._playerList]);
    }

    //push new element into flipped list. if list is full, empty it
    if (flippedList.length === 2) {
      setCloseList([...flippedList.map((x) => x.order)]);
      setFlippedList([{ order, id }]);
      setActivePlayerId(round % players);
    } else {
      setFlippedList([...flippedList, { order, id }]);
    }

    //empty close list
    if (flippedList.length < 2) setCloseList([]);
  };

  const prepareBoard = (_size) => {
    return cardList.map((x, index) => (
      <div key={`grid-item-${index}`} className={`grid-item-${_size}`}>
        <FlipCard
          id={x.id}
          img={x.img}
          size={_size}
          order={index}
          setFlippedId={setFlippedId}
          matchList={matchedList}
          closeList={closeList}
        />
      </div>
    ));
  };

  return matchedList.length === size * 2 ? (
    <GameResult
      size={size}
      player={_.maxBy(playerList, (x) => x.score).name}
      players={players}
    />
  ) : (
    <div className="container d-grid">
      <ScoreBoard playerList={playerList} activePlayerId={activePlayerId} />
      <div className={`grid-container-${size}`}>{prepareBoard(size)}</div>
    </div>
  );
}

export default GameBoard;
