import styled from "styled-components";
const PrepareGame = () => {
  const PrepareContainer = styled.div`
    width: 510px;
    height: 500px;
    border: 5px solid black;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: white;
    justify-content: space-around;
    position: relative;
  `;
  const ShipItem = styled.div`
    width: ${(props) => props.vertical? props.size * 50: 50}px;
    height: 50px;
    border: 4px solid blue;
    background-color: #a2a2d4;
    &:hover {
      cursor: move;
    }
  `;
  const ships = [
    { size: 4, shipId: 1, vertical:true },
    { size: 3, shipId: 2, vertical:true },
    { size: 2, shipId: 3, vertical:true },
    { size: 2, shipId: 4, vertical:true },
    { size: 1, shipId: 5, vertical:true },
    { size: 1, shipId: 6, vertical:true },
    { size: 1, shipId: 7, vertical:true },
    { size: 1, shipId: 8, vertical:true },
  ];
  return (
    <PrepareContainer>
      {ships.map((item) => (
        <ShipItem vertical={item.vertical} key={item.shipId} size={item.size} onClick={()=> item.vertical= !item.vertical}>
          {" "}
        </ShipItem>
      ))}
    </PrepareContainer>
  );
};

export default PrepareGame;
