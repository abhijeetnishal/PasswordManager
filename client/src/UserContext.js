import {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true');
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo, isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
}