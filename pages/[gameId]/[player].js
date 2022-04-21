import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import EnemyBoard from "../../components/EnemyBoard";
import YourBoard from "../../components/YourBoard";
import PrepareGame from "../../components/PrepareGame";

const Container = styled.div`
  width: 80%;
  margin: 0 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90vh;
`;

const Game = () => {
  const { gameId, player} = useRouter().query
  const routerIsReady = useRouter().isReady  
  const [gameData, setGameData] = useState(0);
  const [player1Turn, setPlayer1Turn] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  
  async function getGameData() {
    console.log(gameId)
   const fetchDateUrl = ({ gameId }) => `https://ships-game-f181d-default-rtdb.europe-west1.firebasedatabase.app/games/${gameId}.json`;
      try {
     await axios.get(fetchDateUrl({gameId: gameId})).then(value => ((setGameData(value.data)),setPlayer1Turn(value.data.player1Turn)))  
   } catch (error) {
     console.error(error);
    }
  }

  useEffect(() => {
    gameId && getGameData()
    const interval = playerReady && setInterval(() => {
      getGameData()
    }, 5000);
    return () => clearInterval(interval);
  },[routerIsReady,playerReady])
  return (
    <Container>
      <span>
    <h2>Enemy Board</h2>
        {gameData && playerReady ? <EnemyBoard data={gameData} player1Turn={player1Turn} setPlayer1Turn={setPlayer1Turn} player={player} gameId={gameId} /> : <PrepareGame />}
      </span>
      {gameData && <span>
        {player1Turn ? 'player 1 ' : 'player 2'} turn<br/>
        you are {player}
      </span>}
      <span>
    <h2>Your Board</h2>
        {gameData && <YourBoard data={gameData} player1Turn={player1Turn} setPlayer1Turn={setPlayer1Turn} player={player} gameId={gameId} />}
      </span>
    </Container>
  )
  
};

export default Game;
