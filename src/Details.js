import React from "react";
import { useLocation } from "react-router-dom";
import "./App.css"

export default function Details(){

    const location = useLocation();

    return(
        <div className="App">
            <header className="App-header">
                <p>{location.state.dog}</p>
            </header>
        </div>
    );
}