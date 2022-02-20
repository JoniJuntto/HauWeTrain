import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import './App.css';
import { useAuth, db } from "./firebase";
import { doc, getDoc } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Start() {
    const user = useSelector((state) => state.user.value)
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [dogs, setDogs] = useState([]);
    const [trainings, setTrainings] = useState([]);

    const getDogs = async () => {
        console.log("Getting data for user " + currentUser.uid);
        const docRef = doc(db, "dogs", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data " + docSnap);
            setDogs(docSnap.data());
        } else {
            console.log("No dogs")
        }
    }

    const getTrainings = async () => {
        const docRef = doc(db, "trainings", "112");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data " + docSnap);
            setTrainings(docSnap.data());
        } else {
            console.log("No trainings")
        }
    }

    useEffect(() => {
        if (currentUser) {
            getDogs();
            getTrainings();
        }
    }, [currentUser]);

    const navToAddDog = () => {
        navigate('/add')
    }
    const navToDetails = (dog) => {
        navigate('/dogdetails', { state: { dog: dog } });
    }

    return (
        <div className="App" >
            <header className="App-header">
                <Typography variant='h2'>This is your start Page</Typography>
                <Typography variant='h5'>Next trainings:</Typography>
                <div className="TrainingArray">
                    {trainings.trainingName
                        ? <div>
                            <Typography>{trainings.trainingName}</Typography>
                        </div>
                        : <div>
                            <Typography>No dogs</Typography>
                        </div>
                    }
                </div>
                <Typography variant='h5'>Your dogs:</Typography>
                <div className="DogArray">
                    {dogs.dogNames
                        ? <div>
                            <div>
                                {dogs.dogNames.map((dog) =>
                                    <Typography onClick={() => navToDetails(dog)}>{dog}</Typography>
                                )

                                }
                            </div>
                        </div>
                        : <div>
                            <Typography>No dogs</Typography>
                        </div>
                    }
                </div>
                <Button variant='outlined' onClick={navToAddDog}>Add a dog</Button>
            </header>
        </div>
    );
}