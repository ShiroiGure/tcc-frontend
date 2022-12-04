import { useState } from "react";
import { createContext } from "react";

const FilterContext = createContext();

function FilterProvider({children}) {

  const [filter, setFilters] = useState(null);

  return (
    <FilterContext.Provider 
      value={{
        filter, 
        setFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  )
};

export {FilterProvider, FilterContext};