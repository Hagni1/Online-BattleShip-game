import { useState } from "react";
import styled from "styled-components";
import { ref, set, onValue } from "firebase/database";
const PrepareContainer = styled.div`
  width: 510px;
  height: 500px;
  border: 5px solid black;
  display: flex;
  flex-direction: ${props => props.vertical ? "row" : "column"};
  padding-top: ${props => props.vertical && '10px'};
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
  height:max-content;
  flex-direction: ${props => props.vertical ? "column":"row" };
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

const PrepareGame = ({ data,draggedShip, setDraggedShip, ships, setPlayerReady, }) => {
  const [vertical,setVertical] = useState(false)
  return (
    <><h2>Prepare Game</h2>
      <button onClick={()=>setVertical(!vertical)}>Change Direction</button>
      <PrepareContainer
        vertical={vertical}>
      {ships.length>0? ships.map((item) => (
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
              onMouseDown={() => setDraggedShip({ "size": item.size, "selectedModule": ships, "shipId": item.shipId,"vertical":vertical })}
            >
              {" "}
            </ShipItem>
          ))}
        </ShipContainer>
      )) : setPlayerReady(true)}
      </PrepareContainer>
    </>
  );
};

export default PrepareGame;
