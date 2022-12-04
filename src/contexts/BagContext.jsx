import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";

export const BagContext = createContext();

export default function BagProvider({children}) {

  const [bag, setBag] = useState([]);
  const [isShowingBag, setIsShowingBag] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const resetBag = useCallback(() => {
    setShowResult(false);
    setBag([]);
    localStorage.removeItem('bag');
  }, []);

  return (
    <BagContext.Provider
      value={{
        bag,
        setBag,
        isShowingBag,
        setIsShowingBag,
        showResult,
        setShowResult,
        resetBag
      }}
    >
      {children}
    </BagContext.Provider>
  );
}