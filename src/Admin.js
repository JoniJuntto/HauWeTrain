import { Button, TextField } from "@mui/material";
import React, {useState} from "react";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Admin(){
    const navigate = useNavigate();
    const [training, setTraining] = useState('');
    const trainingId = "112";
    const people = ["Anny", "Mari", "Matti"]

    const handleTrainingChange = e => {
        setTraining(e.target.value)
    };

    const handleNew = async () => {
        const docRef = doc(db, "trainings", trainingId);
            const payload = {
                people: people,
                trainingName: training
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
            <TextField value={training} variant='outlined' onChange={handleTrainingChange} />
                <Button onClick={handleNew}>Add training</Button>
                <Button onClick={backToStart}>Takasi</Button>
            </header>
        </div>
    );
}