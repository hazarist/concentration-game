import React from 'react'

function ScoreBoard({ playerList, activePlayerId }) {
    let preparePlayerBoard = () => {
        return playerList?.map((x) => {
            return (
                <div
                    style={activePlayerId === x.id ? { backgroundColor: "#61dafb" } : {}}
                >
                    <h6>
                        {x.name} Score: {x.score}
                    </h6>
                </div>
            );
        });
    };

    return (
        <div>
            <div className="board-container">{preparePlayerBoard()}</div>
        </div>
    )
}

export default ScoreBoard
