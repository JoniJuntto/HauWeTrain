import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Start from './Start';
import Add from './Add';
import Admin from './Admin';
import Details from './Details';


export default function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/start" element={<Start/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/dogdetails" element={<Details/>}/>
        </Routes>
      </Router>
    </div>
  );
}