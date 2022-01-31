import React, { useState } from "react";
import "./App.css";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { useAuth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export default function Add() {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [dogNames, setDogNames] = useState([]);

    const handleNameChange = e => {
        setDogNames(e.target.value)
    };

    const getDogs = async () => {
        console.log("Getting data for user " + currentUser.uid);
        const docRef = doc(db, "dogs", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data " + docSnap.data());
            const dogs = docSnap.data();
            handleNew(dogs);
        } else {
            console.log("No dogs")
            handleNew("no")
        }
    }



    const handleNew = async (dogs) => {
        const docRef = doc(db, "dogs", currentUser.uid);
        if (dogs === "no") {
            console.log("No dogs previously")
            const payload = {
                id: currentUser.uid,
                dogNames: [dogNames],
                dogIds: [dogNames]
            };
            console.log(payload);
            await setDoc(docRef, payload);
            navigate('/start')
        } else {
            console.log("Already found some dogs")
            const payload = {
                id: currentUser.uid,
                dogNames: [...dogs.dogNames, dogNames],
                dogIds: [...dogs.dogIds, dogNames]
            };
            console.log(payload);
            await setDoc(docRef, payload);
            navigate('/start')
        }


    }

    return (
        <div className="App">
            <header className="App-header">
                <TextField value={dogNames} variant='outlined' onChange={handleNameChange} />
                <Button onClick={getDogs}>Submit</Button>
            </header>
        </div>
    );
}

