import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const BoardItem = styled.div`
  font-size:50px;
  line-height:50px;
  text-align:center;
  color:black;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: ${props => props.ship ? ' 4px solid blue' : ' 2px solid black'};
  background-color: ${props => props.ship || props.hit ? '#a2a2d4' : ''};
  &::after{
    content: '${props => props.hit ? "X" : ''}'
  }
`;
const BoardContainer = styled.div`
  width: 510px;
  border: 5px solid black;
  display: flex;
  flex-wrap: wrap;
  background-color:white;
`;
const YourBoard = ({ data, player, gameId }) => {
  const temp = []
    for (let i = 0; i < 100; i++) {
        temp.push({ id: i, hit: false });
    }
  const [boardItems, setBoardItems] = useState(temp)
  const handleAddShip = (id) => {
    const yourBoard = Object.values(data[`${player}`].yourBoard).slice(1);
    if (yourBoard.filter(el => el.position === id).length === 0) {
      const newBoardItems = [...boardItems]    
      const fetchDateUrl = ({player,gameId}) => `https://ships-game-f181d-default-rtdb.europe-west1.firebasedatabase.app/games/${gameId}/${player}/yourBoard.json`;
      newBoardItems[id].ship = true
      axios.post(fetchDateUrl({player: player,gameId:gameId}), { "position": id, "ship": true, "hit": false })
        setBoardItems(newBoardItems)
    }
  }
  useEffect(() => {
    const newBoardItems = [...boardItems];
    const enemyBoard = Object.values(data[`${player === "player1" ? "player2" : "player1"}`].enemyBoard).slice(1);
    const yourBoard = Object.values(data[`${player}`].yourBoard).slice(1); 
    enemyBoard.map(item=> newBoardItems[item.position].shot=item.shot)
    yourBoard.map(item=> newBoardItems[item.position].ship=item.ship)
  }, [data])
  
  return (
    <BoardContainer>
      {boardItems.map((item) => (
        <BoardItem
          key={item.id}
          hit={item.hit}
          ship={item.ship}
          id={item.id}
          onClick={() => handleAddShip(item.id)}
        >{item.shot && <span>O</span>}</BoardItem>
      ))}
    </BoardContainer>
  );
};

export default YourBoard;
