import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css"
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

export default function Details(){
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const dog = location.state.dog;

    const getDogNotes = async () =>{
        const docRef = doc(db, "notes", dog);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data " + docSnap.data());
            setNotes(docSnap.data());
        }else{
            console.log("No notes")
        }
    }

    useEffect(() => {
        if (dog) {
            getDogNotes()
        }
      }, [dog]);

    return(
        <div className="App">
            <header className="App-header">
                <Typography variant='h2'>{location.state.dog}</Typography>
                <div className="notesArray">
                    {notes.notes
                    ?<div>
                        <div>
                            {notes.notes.map((note)=>
                            <Typography>{note}</Typography>
                            )
                            }
                        </div>
                    </div>
                    :<div>
                        <Typography>No notes</Typography>
                    </div>
                    }   
                </div>
            </header>
        </div>
    );
}