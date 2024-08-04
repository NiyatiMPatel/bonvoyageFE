import { createContext, ReactNode, useContext, useReducer } from "react";
import { SearchAction, SearchContextValue, SearchVariables } from "../types/types";


// CREATE SEARCH CONTEXT
const SearchContext = createContext<SearchContextValue | null>(null)

// CREATE CUSTOME SEARCH CONTEXT HOOK
export function useSearchContext(){
 const searchCtx = useContext(SearchContext)

 if(searchCtx === null){
  throw new Error("SearchCtx is null - that should not be the case")
 }

 return searchCtx;
}

// REDUCER FUNCTION
function reducer(state:SearchVariables, action:SearchAction):SearchVariables{
 const {type,payload} = action;
 switch (type) {
  case "DESTINATION":
   return {...state, destination:payload as string};
  case "CHECKIN":
   return {...state, checkIn:payload as Date};
  case "CHECKOUT":
   return {...state, checkOut:payload as Date};
  case "ADULTCOUNT":
   return {...state, adultCount:payload as number};
  case "CHILDCOUNT":
   return {...state, childCount:payload as number};
  case "HOTELID":
   return {...state, hotelId:payload as string};
   
  default:
   return state
 }
}

function SearchContextProvider({children}:{children:ReactNode}){

 const initialState:SearchVariables={
  destination: sessionStorage.getItem("destination") || "",
  checkIn: new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()),
  checkOut: new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()),
  adultCount: +(sessionStorage.getItem("adultCount") || "1"),
  childCount: +(sessionStorage.getItem("childCount") || "0"),
  hotelId: sessionStorage.getItem("hotelID") || "",
 }

 const [state,dispatch]=useReducer(reducer,initialState)

 const saveSearchValues = (
  destination: string,
  checkIn: Date,
  checkOut: Date,
  adultCount: number,
  childCount: number,
  hotelId?: string,)=>{
   dispatch({type:"DESTINATION", payload:destination})
   dispatch({type:"CHECKIN", payload:checkIn})
   dispatch({type:"CHECKOUT", payload:checkOut})
   dispatch({type:"ADULTCOUNT", payload:adultCount})
   dispatch({type:"CHILDCOUNT", payload:childCount})

   if(hotelId){
    dispatch({type:"HOTELID", payload:hotelId})
    sessionStorage.setItem("hotelId", hotelId);
   }

   sessionStorage.setItem("destination", destination);
   sessionStorage.setItem("checkIn", checkIn.toISOString());
   sessionStorage.setItem("checkOut", checkOut.toISOString());
   sessionStorage.setItem("adultCount", adultCount.toString());
   sessionStorage.setItem("childCount", childCount.toString());
  
 }

 const searchCtx:SearchContextValue={
  ...state,
  saveSearchValues
 }
 return (
  <SearchContext.Provider value={searchCtx}>
   {children}
  </SearchContext.Provider>
 )
}

export default SearchContextProvider;