import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import axios from "axios";
import { useState, } from "react";
import { useRouter } from "next/router";
import { app } from './../firebase.tsx'
import { getDatabase, ref, set } from "firebase/database";
// import { getFirestore, ref, getDatabase} from 'firebase/firestore/lite';
const InputNumber = styled.input`
  width:5vw;
  border: 3px solid black;
  `

  const Container = styled.div`
    width: 80%;
    margin: 0 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90vh;
  `;
  const Button = styled.button`
    padding: 1em;
    width: 20vw;
    margin: 0.5em;
    border: 3px solid black;
    border-radius: 5em;
    font-size: 2em;
    background-color: white;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      background-color: grey;
      cursor: pointer;
    }
  `;
  const ButtonGroup = styled.span`
    display: flex;
  `;



export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(0)
  const [inputValue, setInputValue]= useState(0)

  const handleJoinGame = () => {
    
  }
  function handleCreateNewGame() {
    const newGameTemplate= {
      "player1": {
        "enemyBoard": [
          {"placeholder":"dont remove"}
        ],
        "nickname": "Player 1",
        "yourBoard": [
          {"placeholder":"dont remove"},
        ]
      },
      "id": data.length,
      "player1Turn": true,
        "player2": {
          "enemyBoard": [
            { "placeholder": "dont remove" }
          ],
          "nickname": "Player 2",
          "yourBoard": [
            {"placeholder":"dont remove"},
          ]
        } }
    const db = getDatabase();
    data && set(ref(db, 'games/' + Object.keys(data).length), {...newGameTemplate});
    router.push(`/${Object.values(data).length}/player1`)
  }
  

  const getData = () => {
    axios.get(
      `https://ships-game-f181d-default-rtdb.europe-west1.firebasedatabase.app/games.json`)
      .then(value => setData(value.data))
  }
  
  data === 0 && getData()
  return (
    <Container>
      <h1>Ships Game</h1>
      <ButtonGroup>
        <Button onClick={()=>handleCreateNewGame()}>Create new game</Button>
        <label>
          <p>
          Enter game number:
            <InputNumber value={inputValue} type="number" onChange={(e) => setInputValue(e.target.value)} max={Object.values(data).length} min={0} />
          </p>
          <Button onClick={()=> router.push(`/${inputValue}/player2`)}>Join an existing game</Button>
        </label>
      </ButtonGroup>
    </Container>
  );
}
