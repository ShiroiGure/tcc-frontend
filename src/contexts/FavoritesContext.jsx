import { useState } from "react";
import { createContext } from "react";

export const FavoriteContext = createContext();

export default function FavoriteProvider({children}) {

  const [favorites, setFavorites] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  return (
    <FavoriteContext.Provider
      value={{  
        favorites, 
        setFavorites,
        isShowing,
        setIsShowing
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}