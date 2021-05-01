import React, { createContext, useEffect, useState } from 'react';
import './context.css'

const Context = createContext();

const AuthProvider = ({children})=>{
    const [token, settoken]= useState(false);
    const [loading, setloading]= useState(true);

    useEffect( () => { 
        const key = localStorage.getItem('token');
        if(key){
            settoken(true);
        }
        setloading(false);
    },[]);
    
    if(loading){
        return (
            <div className="load">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="visually-hidden">carregando...</div>
        </div>
      )
    }

    return(
        <Context.Provider value = {{ token, settoken }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider};