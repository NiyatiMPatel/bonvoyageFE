import { createContext, useContext, type ReactNode } from "react";
import * as apiClient from "../axios/api-client";
import { useQuery } from "@tanstack/react-query";

type UserContextValue={
isLoggedIn:boolean
}
 
// CREATE CONTEXT
const UserContext = createContext<UserContextValue | null>(null)

// NEED TO CREATE CUSTOM HOOK THAT ENSURES TYPESCRIPT THAT CONTEXT VALUE WHENEVER ACCESS WILL NOT BE NULL
export function useUserContext(){
 const userCtx = useContext(UserContext)

 if(userCtx === null){
  throw new Error("UserCtx is null - that should not be the case")
 }

 return userCtx;
}

// CREATE CONTEXT PROVIDER
function UserContextProvider({children}:{children:ReactNode}){

 const { isError } = useQuery({
  // IDENTIFIER TO REUSE THE DATA LATER WHEN REQUIRED
  queryKey: ["validateToken"],
  // API CALLING FUNCTION
  queryFn: apiClient.validateToken,
  retry: false,
});

const userCtx:UserContextValue = {
 isLoggedIn:!isError
}


return (
<UserContext.Provider value={userCtx}>
 {children}
 </UserContext.Provider>
 )
}

export default UserContextProvider;