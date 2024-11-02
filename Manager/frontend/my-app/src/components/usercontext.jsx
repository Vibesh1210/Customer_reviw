import {createContext, useState} from "react";

const UserContext = createContext({});

function UserContextProvider({children}) {
    const [user, setuser] = useState({});
  return (
    <UserContext.Provider value={{user,setuser}}>
      {children}
    </UserContext.Provider>
  );
}

export  {UserContext,UserContextProvider};
