import styled from "styled-components";
import Link from 'next/link'
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
  flex-direction:column;
  height: 90vh;
`;
const Winner = styled.div`
  width: 60%;
  position: fixed;
  height: 50vh;
  background: #555;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const WinnerButton = styled.button`
  font-size: 1.5em;
  padding: 1em;
  border-radius: 15%;
`;
const BoardsContainer = styled.div`
display:flex;
justify-content:space-around;
opacity:${props => (props.playerReady && !props.active) && '0.5'};
transition:0.3s;
`

const Game = () => {
  const { gameId, player } = useRouter().query;
  const router = useRouter()
  const routerIsReady = useRouter().isReady;
  const [gameData, setGameData] = useState("");
  const [player1Turn, setPlayer1Turn] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const [draggedShip, setDraggedShip] = useState(false);
  const [winner, setWinner] = useState("");
  const db = getDatabase();

  const getGameData = () => {
    const gameDataRef = ref(db, `games/${gameId}`);
    onValue(gameDataRef, (snapshot) => {
      const data = snapshot.val();
      setGameData(data);
      setPlayer1Turn(data.player1Turn);
      data[player].ships
        ? setShips(Object.values(data[player].ships))
        : setShips([]);
      data[player].yourBoard[-1] && delete data[player].yourBoard[-1];
      data[player].enemyBoard[-1] && delete data[player].enemyBoard[-1];
      data[`${player === "player1" ? "player2" : "player1"}`].enemyBoard[-1] &&
        delete data[`${player === "player1" ? "player2" : "player1"}`]
          .enemyBoard[-1];
      data.Winner && setWinner(data.Winner);
    });
  };

    gameData &&!winner &&
      (Object.values(gameData.player1.enemyBoard).filter(
        (item) => item.ship === true
      ).length >= 17 && set(ref(db, `games/${gameId}/Winner`), "player1"),
      Object.values(gameData.player2.enemyBoard).filter(
        (item) => item.ship === true
      ).length >= 17 && set(ref(db, `games/${gameId}/Winner`), "player2"));

  const [ships, setShips] = useState(0);
  useEffect(() => {
    gameId && getGameData();
    const interval =
      playerReady &&
      setInterval(() => {
        getGameData();
      }, 1000);
    
    return () => clearInterval(interval);
  }, [routerIsReady, playerReady]);
  return (
    <Container>
       {gameData && (
        <span>
          <h1>You are {player}</h1>
          {player ==='player1' && <h3>Invite friend by home page selecting {gameId} in game number field</h3>}
        </span>
      )}
      {gameData && (
      <BoardsContainer
      playerReady={playerReady}
      active={gameData.player2.isReady && gameData.player1.isReady &&  player === 'player1' ? (player1Turn ? true : false) : (player1Turn ? false : true)}>
        {gameData &&
          (playerReady ? (
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
              db={db}
                player={player}
                playerReady={playerReady}
              gameId={gameId}
            />
          ))}
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
      </BoardsContainer>
      )}
      {winner && (
        <Winner>
          <h1>THE WINNER IS {winner}!</h1>
          <Link  href="/">
          <WinnerButton >Back to start</WinnerButton>
          </Link>
        </Winner>
      )}
    </Container>
  );
};

export default Game;
