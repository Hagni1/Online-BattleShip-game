import styled from "styled-components";
import { useState, } from "react";
import { useRouter } from "next/router";
import { app } from './../firebase.tsx'
import Select from 'react-select'
import { getDatabase, ref, set, onValue } from "firebase/database";
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
    border-radius: 2em;
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
  const db = getDatabase();
  const router = useRouter();
  const [data, setData] = useState(0)
  const [inputValue, setInputValue]= useState(0)
  function handleCreateNewGame() {
    const newGameTemplate= {
      "player1": {
        "isReady": false,
        "ships": {
          "0": { "name": "Battleship ", "size": [1, 2, 3, 4], "shipId": 0, "vertical": true },
          "1": { "name": "Cruiser", "size": [1, 2, 3], "shipId": 1, "vertical": true },
          "2": { "name": "Cruiser", "size": [1, 2, 3], "shipId": 2, "vertical": true },
          "3": { "name": "Submarine ", "size": [1, 2], "shipId": 3, "vertical": true },
          "4": { "name": "Submarine ", "size": [1, 2], "shipId": 4, "vertical": true },
          "5": { "name": "Destroyer  ", "size": [1], "shipId": 5, "vertical": true },
          "6": { "name": "Destroyer  ", "size": [1], "shipId": 6, "vertical": true },
          "7": { "name": "Destroyer  ", "size": [1], "shipId": 7, "vertical": true },
        },
        "enemyBoard": {
          "-1":{"placeholder":"dont remove"},
        },
        "nickname": "Player 1",
        "yourBoard": {
          "-1":{"placeholder":"dont remove"},
        }
        
      },
      "id": data.length,
      "player1Turn": true,
      "player2": {
        "ships": {
          "0": { "name": "Battleship ", "size": [1, 2, 3, 4], "shipId": 0, "vertical": true },
          "1": { "name": "Cruiser", "size": [1, 2, 3], "shipId": 1, "vertical": true },
          "2": { "name": "Cruiser", "size": [1, 2, 3], "shipId": 2, "vertical": true },
          "3": { "name": "Submarine ", "size": [1, 2], "shipId": 3, "vertical": true },
          "4": { "name": "Submarine ", "size": [1, 2], "shipId": 4, "vertical": true },
          "5": { "name": "Destroyer  ", "size": [1], "shipId": 5, "vertical": true },
          "6": { "name": "Destroyer  ", "size": [1], "shipId": 6, "vertical": true },
          "7": { "name": "Destroyer  ", "size": [1], "shipId": 7, "vertical": true },
        },
          "enemyBoard": {
            "-1":{"placeholder":"dont remove"},
          },
        "nickname": "Player 2",
        "isReady": false,
          "yourBoard": {
            "-1":{"placeholder":"dont remove"},
          }
      }
    }
   
      data && set(ref(db, 'games/' + Object.keys(data).length), {...newGameTemplate}),
      router.push(`/${Object.values(data).length}/player1`)
    
  }
  

  const getData = () => {
    const gamesRef = ref(db,`games/`)
    onValue(gamesRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }

  const options = []
  Object.values(data).filter(item => item.Winner ? false : true).map(game => options.push({ value:game.id, label:game.id }))
  data === 0 && getData()
  return (
    <Container>
      <h1>Ships Game</h1>
      <ButtonGroup>
        <Button onClick={()=>handleCreateNewGame()}>Create new game</Button>
        <label>
          <p>
          Select available games:
            <Select options={options} onChange={option => setInputValue(option.value)}/>
          </p>
          <Button onClick={()=>  inputValue !==0 && router.push(`/${inputValue}/player2`)}>Join selected game</Button>
        </label>
      </ButtonGroup>
    </Container>
  );
}
