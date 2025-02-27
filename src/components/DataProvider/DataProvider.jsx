import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const DataContext=createContext()
export const DataProvider=({children,reducer,initialState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer,initialState)}>
         {children}
        </DataContext.Provider>
    )
}


DataProvider.propTypes = {
    children: PropTypes.node.isRequired, // children must be a renderable React node
    reducer: PropTypes.func.isRequired,   // reducer must be a function
    initialState: PropTypes.oneOfType([   // initialState can be an object or an array
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
  };