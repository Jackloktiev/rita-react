import React, { useState} from "react";

export const AuthContext = React.createContext({
    isAuth:"false",
    login: ()=>{},
    logout:()=>{}
});

const AuthContextProvider = props => {
    const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("isAuthenticated"));
    
    const loginHandler =()=>{
        setIsSignedIn("true");
    }

    const outHandler =()=>{
        setIsSignedIn("false");
    }

    return (
        <AuthContext.Provider value={{isAuth:isSignedIn, login:loginHandler, logout:outHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
