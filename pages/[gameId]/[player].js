import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EnemyBoard from "../../components/EnemyBoard";
import YourBoard from "../../components/YourBoard";
import PrepareGame from "../../components/PrepareGame";
import { getDatabase, ref, set, onValue } from "firebase/database";
const Container = styled.div`
  width: 80%;
  margin: 0 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90vh;
`;

const Game = () => {
  const { gameId, player } = useRouter().query;
  const routerIsReady = useRouter().isReady;
  const [gameData, setGameData] = useState(0);
  const [player1Turn, setPlayer1Turn] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [draggedShip, setDraggedShip] = useState(false);
  const db = getDatabase();

  const getGameData = () => {
    const gameDataRef = ref(db, `games/${gameId}`);
    onValue(gameDataRef, (snapshot) => {
      const data = snapshot.val();
      setGameData(data);
      setPlayer1Turn(data.player1Turn);
      data[player].ships ? setShips(Object.values(data[player].ships)): setShips([])
      data[player].yourBoard[-1] && delete data[player].yourBoard[-1];
      data[player].enemyBoard[-1] && delete data[player].enemyBoard[-1];
      data[`${player === "player1" ? "player2" : "player1"}`].enemyBoard[-1] && delete data[`${player === "player1" ? "player2" : "player1"}`].enemyBoard[-1]
    });
  };

  const [ships, setShips] = useState(0);
  useEffect(() => {
    gameId && getGameData();
    const interval =
      playerReady &&
      setInterval(() => {
        getGameData();
      }, 5000);
    return () => clearInterval(interval);
  }, [routerIsReady, playerReady]);
  return (
    <Container>
      <span>
        {gameData && (playerReady ? (
          <EnemyBoard
            data={gameData}
            player1Turn={player1Turn}
            setPlayer1Turn={setPlayer1Turn}
            player={player}
            gameId={gameId}
            db={db}
          />
        ) : (
          <PrepareGame
            data={gameData}
            draggedShip={draggedShip}
            setDraggedShip={setDraggedShip}
              setPlayerReady={setPlayerReady}
              ships={ships}
          />
        ))}
      </span>
      {gameData && (
        <span>
          {player1Turn ? "player 1 " : "player 2"} turn
          <br />
          you are {player}
        </span>
      )}
      <span>
        {gameData && (
          <YourBoard
            data={gameData}
            player1Turn={player1Turn}
            setPlayer1Turn={setPlayer1Turn}
            player={player}
            gameId={gameId}
            draggedShip={draggedShip}
            db={db}
          />
        )}
      </span>
    </Container>
  );
};

export default Game;
