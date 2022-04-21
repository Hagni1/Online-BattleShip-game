import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const BoardItem = styled.div`
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  color: black;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 2px solid black;
  background-color: ${(props) => (props.hit ? "red" : "")};
`;
const BoardContainer = styled.div`
  width: 510px;
  border: 5px solid black;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;
const Board = ({ data, player1Turn, setPlayer1Turn, player, gameId }) => {
  const temp = [];
  for (let i = 0; i < 100; i++) {
    temp.push({ id: i, hit: false });
  }
  const [boardItems, setBoardItems] = useState(temp);

  const handleShot = (id) => {
    if (player ==='player1' ? player1Turn : !player1Turn) {
      if (
        Object.values(data[`${player}`].enemyBoard).filter(
          (el) => el.position === id
        ).length === 0
      ) {
        setPlayer1Turn(player === "player1" ? false : true);
        const fetchPlayer1Turn = ({gameId}) => `https://ships-game-f181d-default-rtdb.europe-west1.firebasedatabase.app/games/${gameId}.json`;
        axios.patch(
          fetchPlayer1Turn({gameId: gameId}),
          { player1Turn: player === "player1" ? false : true }
        );
        const newBoardItems = [...boardItems];
        const enemyShips = Object.values(
          data[`${player === "player1" ? "player2" : "player1"}`].yourBoard
        );
        const fetchDateUrl = ({data,gameId}) => `https://ships-game-f181d-default-rtdb.europe-west1.firebasedatabase.app/games/${gameId}/${data}/enemyBoard.json`;
        if (enemyShips.filter((el) => el.position === id).length > 0) {
          newBoardItems[id].hit = true;
         axios.post(fetchDateUrl({date: player,gameId:gameId}), { position: id, ship: true, shot: false })
        } else {
          newBoardItems[id].shot = true;
          axios.post(fetchDateUrl({date: player}), { position: id, ship: false, shot: true })
        }
        setBoardItems(newBoardItems);
      }
    }
  };
  useEffect(() => {
    const newBoardItems = [...boardItems];
    const enemyBoard = Object.values(data[`${player}`].enemyBoard).slice(1);
    enemyBoard.map((item) => (newBoardItems[item.position].shot = item.shot));
    enemyBoard.map((item) => (newBoardItems[item.position].hit = item.ship));
  }, [data]);

  return (
    <BoardContainer>
      {boardItems.map((item) => (
        <BoardItem
          key={item.id}
          hit={item.hit}
          shot={item.shot}
          id={item.id}
          onClick={() => handleShot(item.id)}
        >
          {item.shot && <span>O</span>}
        </BoardItem>
      ))}
    </BoardContainer>
  );
};

export default Board;
