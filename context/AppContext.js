import { useState, createContext } from "react";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const gameIndex = Math.floor(Math.random() * 3);
  const [gameData, setGameData] = useState(data[gameIndex])
  const [nickName, setNickName] = useState('')
  const [score, setScore] = useState(0)
  return (
      <AppContext.Provider value={{nickName, setNickName, score, setScore,gameData, setGameData }}>
        {children}
      </AppContext.Provider>
    );
  };
  export default AppProvider;