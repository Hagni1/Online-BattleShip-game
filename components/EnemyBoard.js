import { useState, useEffect } from "react";
import styled from "styled-components";
import { ref, set } from "firebase/database";
const BoardWrapper = styled.div`

`
const BoardItem = styled.div`
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  display:flex;
  align-items:center;
  justify-content:center;
  color: black;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid black;
  background-color: ${(props) => (props.hit ? "red" : "")};
  
  &:hover{
    border:${props => (props.active && !props.shot && !props.hit) && "4px solid green" };
    cursor:${props => (props.active && !props.shot && !props.hit) ? 'pointer': 'default '};
  }
`;
const BoardContainer = styled.div`
  width: 510px;
  border: 5px solid black;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;
const Board = ({ data, player1Turn, setPlayer1Turn, player, gameId ,db}) => {
  const temp = [];
  for (let i = 0; i < 100; i++) {
    temp.push({ id: i, hit: false });
  }
  const [boardItems, setBoardItems] = useState(temp);

  const handleShot = (id) => {
    if (player === "player1" ? player1Turn : !player1Turn) {
      if (
        Object.values(data[`${player}`].enemyBoard).filter(
          (el) => el.position === id
        ).length === 0
      ) {
        setPlayer1Turn(player === "player1" ? false : true);
        set(ref(db, `games/${gameId}/player1Turn`), (player === "player1" ? false : true))
        const newBoardItems = [...boardItems];
        const enemyShips = Object.values(
          data[`${player === "player1" ? "player2" : "player1"}`].yourBoard
        );
        if (enemyShips.filter((el) => el.position === id).length > 0) {
          newBoardItems[id].hit = true;
          set(ref(db, `games/${gameId}/${player}/enemyBoard/${id}`), {
            position: id,
            ship: true,
            shot: false,
          })
        } else {
          newBoardItems[id].shot = true;
          set(ref(db, `games/${gameId}/${player}/enemyBoard/${id}`), {
            position: id,
            ship: false,
            shot: true,
          })
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
    <BoardWrapper>
      <h2>Enemy Board</h2>
      <BoardContainer>
        {boardItems.map((item) => (
          <BoardItem
            active={player === 'player1' ? (player1Turn ? true : false) : (player1Turn ? false : true)}
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
    </BoardWrapper>
  );
};

export default Board;
