import { useState } from "react";
import styled from "styled-components";
import { ref, set, onValue } from "firebase/database";
const BoardWrapper = styled.div``;
const Button = styled.button`
  font-size: 1.2em;
  background-color: #999;
  padding: .5em .5em;
  outline: none;
  border: 2px solid black;
  height:max-content;
  box-sizing:border-box;
  margin-right:2em;
  cursor: pointer;
  border-radius: .2em;
  color: black;
    transition:.3s;
  &:hover{
    opacity:0.7;
    transition:.3s;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
`;
const PrepareContainer = styled.div`
  width: 510px;
  height: 510px;
  border: 5px solid black;
  display: flex;
  flex-direction: ${(props) => (props.vertical ? "row" : "column")};
  padding-top: ${(props) => props.vertical && "10px"};
  flex-wrap: wrap;
  background-color: white;
  justify-content: space-between;
  position: relative;
`;
const ShipContainer = styled.div`
  display: flex;
  border: 3px solid blue;
  flex-shrink: 2;
  width: max-content;
  height: max-content;
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  /* border-radius:2rem; */
  background-color: lightblue;
`;
const ShipItem = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid blue;
  &:hover {
    cursor: move;
    transition: 0.3s;
  }
  background-color: #a2a2d4;
`;

const PrepareGame = ({
  data,
  draggedShip,
  setDraggedShip,
  ships,
  setPlayerReady,
}) => {
  const [vertical, setVertical] = useState(false);
  return (
    <BoardWrapper>
      <Header>
        <h2>Prepare Game</h2>
        <Button onClick={() => setVertical(!vertical)}>Change Direction</Button>
      </Header>
      <PrepareContainer vertical={vertical}>
        {ships.length > 0
          ? ships.map((item) => (
              <ShipContainer
                className="ShipContainer"
                shipId={item.shipId}
                id={item.shipId}
                key={item.name + item.shipId}
                draggable={true}
                vertical={vertical}
                onDragEnd={() => setDraggedShip(false)}
              >
                {item.size.map((ships) => (
                  <ShipItem
                    key={item.name + ships}
                    size={item.size}
                    onMouseDown={() =>
                      setDraggedShip({
                        size: item.size,
                        selectedModule: ships,
                        shipId: item.shipId,
                        vertical: vertical,
                      })
                    }
                  >
                    {" "}
                  </ShipItem>
                ))}
              </ShipContainer>
            ))
          : setPlayerReady(true)}
      </PrepareContainer>
    </BoardWrapper>
  );
};

export default PrepareGame;
