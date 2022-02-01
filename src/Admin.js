import { Button, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
import { setDoc, doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Admin(){
    const navigate = useNavigate();
    const [training, setTraining] = useState('');
    const [dog, setDog] = useState("");
    const [note, setNote] = useState("");
    const trainingId = "112";
    const people = ["Anny", "Mari", "Matti"]

    const handleTrainingChange = e => {
        setTraining(e.target.value)
    };
    const handleDogChange = e =>{
        setDog(e.target.value);
    }
    const handleNoteChange = e =>{
        setNote(e.target.value);
    }
    const getDogNotes = async () =>{
        const docRef = doc(db, "notes", dog);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document data " + docSnap.data());
            const notes = docSnap.data();
            handleNewNote(notes);
        }else{
            console.log("No notes");
            handleNewNote("no");
        }
    }

    const handleNewNote = async (notes) => {
        const docRef = doc(db, "notes", dog);
        if(notes === "no"){
            console.log("No notes existing");
            const payload = {
                notes: [note]
            };
            console.log(payload);
            await setDoc(docRef, payload);
            //Toast here
        }else{
            console.log("Existing notes found");
            const payload = {
                notes: [...notes.notes, note]
            };
            console.log(payload);
            await setDoc(docRef, payload);
            //toast here
        }
    }

    const handleNew = async () => {
        const docRef = doc(db, "trainings", trainingId);
            const payload = {
                people: people,
                trainingName: training,
            };
            console.log(payload);
            await setDoc(docRef, payload);

    }

    const backToStart = () =>{
        navigate('/start')
    }

    return(
        <div className="App">
            <header className="App-header">
                <Typography >Add a training</Typography>
                <TextField value={training} variant='standard' onChange={handleTrainingChange} />
                <Button onClick={handleNew}>Add training</Button>
                <Typography variant='h3'>Add a note</Typography>
                <Typography>Dog name</Typography>
                <TextField value={dog} variant='standard' onChange={handleDogChange} />
                <Typography>Notes for that dog</Typography>
                <TextField value={note} onChange={handleNoteChange}></TextField>
                <Button onClick={getDogNotes}>Send Notes</Button>
                <Button onClick={backToStart}>Back</Button>
            </header>
        </div>
    );
}