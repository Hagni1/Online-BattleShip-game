import { ref, set, onValue, remove } from "firebase/database";
const checkPlacement = (
    ship,
    yourBoard,
    id,
    leftSide,
    rightSide,
    modulesId,
    topSide,
    bottomSide
  ) => {
    const checkLeftRight = id % 10 <= (id + rightSide) % 10 && id % 10 >= (id - leftSide) % 10 && (id - leftSide) >0 && (id + rightSide)<100;
    const checkTopBottom = topSide>=0 && bottomSide<100
    const checkSides = (item) => {
      let result = true;
      yourBoard[item] && (result = false);
      item % 10 !== 0 && yourBoard[item - 1] && (result = false);
      item % 10 !== 9 && yourBoard[item + 1] && (result = false);
      item > 9 && yourBoard[item - 10] && (result = false);
      item < 90 && yourBoard[item + 10] && (result = false);
      return result;
    };
    const checkList =
    (ship.vertical?  checkTopBottom: checkLeftRight) &&
      modulesId.map((item) => checkSides(item)).filter((el) => el === false)
        .length === 0 &&
      true;
    return checkList;
  };
 export const handleAddShip = (id, ship, data, player,db,gameId,setShips) => {
    console.log(ship, 'ship')
    const modulesId = [];
    const rightSide = ship.size.slice(ship.selectedModule).length;
    const leftSide = ship.size.slice(0, ship.selectedModule - 1).length;
    const topSide=ship.size.slice(0, ship.selectedModule - 1).length*10
    const bottomSide=ship.size.slice(ship.selectedModule).length*10
    console.log(topSide,'top Side')
    console.log(bottomSide,'bottom Side')
    if (!ship.vertical) {
      for (let i = id - leftSide; i <= id + rightSide; i++) {
        modulesId.push(i);
      }
    } else {
      for (let i = id - topSide; i <= id + bottomSide; i+=10) {
        modulesId.push(i);
      }
    }
    const yourBoard = data[`${player}`].yourBoard;
    if (checkPlacement(ship, yourBoard, id,leftSide,rightSide,modulesId,topSide, bottomSide)) {
      modulesId.map((item) =>
        set(ref(db, `games/${gameId}/${player}/yourBoard/` + item), {
          hit: false,
          position: item,
          ship: true,
        })
      );
      remove(ref(db, `games/${gameId}/${player}/ships/` + ship.shipId));
      yourBoard[-1] &&remove(ref(db, `games/${gameId}/${player}/yourBoard/` + "-1"));
    }
  };