import { useState, useEffect } from "react";
import styled from "styled-components";
import { app } from "./../firebase.tsx";
import { handleAddShip } from "./HandleAddShip";
const BoardItem = styled.div`
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  color: black;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: ${(props) => (props.ship ? " 4px solid blue" : " 2px solid black")};
  background-color: ${(props) => (props.ship || props.hit ? "#a2a2d4" : "")};
  &::after {
    content: "${(props) => (props.hit ? "X" : "")}";
  }
`;
const BoardContainer = styled.div`
  width: 510px;
  border: 5px solid black;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;
const YourBoard = ({ data, player, gameId, draggedShip, setShips ,db }) => {
  const temp = [];
  for (let i = 0; i < 100; i++) {
    temp.push({ id: i, hit: false });
  }
  const [boardItems, setBoardItems] = useState(temp);

  function allowDrop(e) {
    e.preventDefault();
  }
  useEffect(() => {
    const newBoardItems = [...boardItems];
    const enemyBoard = Object.values(
      data[`${player === "player1" ? "player2" : "player1"}`].enemyBoard
    );
    const yourBoard = Object.values(data[`${player}`].yourBoard);
    enemyBoard.map((item) => (newBoardItems[item.position].shot = item.shot));
    yourBoard.map((item) => (newBoardItems[item.position].ship = item.ship));
    setBoardItems(newBoardItems);
  }, [data]);
  return (
    <>
      <h2>Your Board</h2>
      <BoardContainer>
      {boardItems.map((item) => (
        <BoardItem
          key={item.id}
          hit={item.hit}
          ship={item.ship}
          id={item.id}
          onDrop={() => handleAddShip(item.id, draggedShip,data,player,db, gameId,setShips)}
          onDragOver={() => allowDrop(event)}
        >
          {item.shot && <span>O</span>}
        </BoardItem>
      ))}
      </BoardContainer>
    </>
  );
};

export default YourBoard;
