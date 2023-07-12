import React, { createContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = ({children }) => {
    
    const [endpoint, setEndpoint] = useState("3.135.182.10")

      return(
        <GlobalContext.Provider value={{endpoint}}>
          {children}
        </GlobalContext.Provider>
      );
}

// localhost
// 18.189.17.51
// 3.135.182.10 

  export default {GlobalContext, GlobalProvider};
