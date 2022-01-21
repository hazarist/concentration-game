import React, { useCallback, useEffect, useReducer } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FlipCard from "../FlipCard/FlipCard.jsx";
import ScoreBoard from "../ScoreBoard/ScoreBoard.jsx";
import "./style.css";

function gameBoardReducer(state, action) {
  switch (action.type) {
    case "setMatchedList": {
      return { ...state, matchedList: action.value };
    }
    case "setFlippedList": {
      return { ...state, flippedList: action.value };
    }
    case "setCloseList": {
      return { ...state, closeList: action.value };
    }
    case "setPlayerList": {
      return { ...state, playerList: action.value };
    }
    case "setActivePlayerId": {
      return { ...state, activePlayerId: action.value };
    }
    case "setRound": {
      return { ...state, round: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const gameBoardInit = {
  matchedList: [],
  flippedList: [],
  closeList: [],
  playerList: [],
  activePlayerId: 0,
  round: 0
};

function GameBoard({ cardList = [], size, players }) {
  const [state, dispatch] = useReducer(gameBoardReducer, gameBoardInit);

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
    dispatch({ type: "setPlayerList", value: _playerList });
  }, [players]);

  useEffect(() => {
    preparePlayerList();
  }, [preparePlayerList]);

  const setFlippedId = (order, id) => {
    // round counter
    if (state.flippedList[0]?.id !== id && state.flippedList.length === 1) {
      dispatch({ type: "setRound", value: state.round + 1 });
    }

    //match control
    if (state.flippedList[0]?.id === id && state.flippedList.length === 1) {
      dispatch({ type: "setMatchedList", value: [...state.matchedList, id] });

      // set score to the player
      let _playerList = state.playerList.map((x) => {
        if (state.activePlayerId === x.id) {
          x.score += 1;
        }
        return x;
      });
      dispatch({ type: "setPlayerList", value: [..._playerList] });
    }

    //push new element into flipped list. if list is full, empty it
    if (state.flippedList.length === 2) {
      dispatch({
        type: "setCloseList",
        value: [...state.flippedList.map((x) => x.order)]
      });
      dispatch({ type: "setFlippedList", value: [{ order, id }] });
      dispatch({ type: "setActivePlayerId", value: state.round % players });
    } else {
      dispatch({
        type: "setFlippedList",
        value: [...state.flippedList, { order, id }]
      });
    }

    //empty close list
    if (state.flippedList.length < 2)
      dispatch({ type: "setCloseList", value: [] });
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
          matchList={state.matchedList}
          closeList={state.closeList}
        />
      </div>
    ));
  };

  return (
    <div className="container d-grid" style={{ position: "relative" }}>
      <ScoreBoard
        playerList={state.playerList}
        activePlayerId={state.activePlayerId}
      />
      {state.matchedList.length === size * 2 ? (
        <div
          style={{
            display: "block",
            position: "absolute",
            left: "37%",
            background: "black",
            color: "white",
            padding: "20px 50px"
          }}
        >
          Game is over
          <div style={{ marginBottom: "5px" }}>
            Scoreboard
            {state.playerList
              .sort((a, b) => b - a)
              .map((x, i) => {
                return <div>{`${i + 1}) ${x.name}: ${x.score}`}</div>;
              })}
          </div>
          <Link to={"/"}>Game Screen</Link>
        </div>
      ) : (
        <></>
      )}
      <div className={`grid-container-${size}`}>{prepareBoard(size)}</div>
    </div>
  );
}

export default GameBoard;
