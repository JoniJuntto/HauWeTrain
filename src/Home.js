import './App.css';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { auth } from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import { useSelector, useDispatch } from 'react-redux';
import { changeUser } from './features/user/userSlice';

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const notify = (text, state) => {
        if (state === 'success') {
            toast.success(text)
        } else if (state === 'error') {
            toast.error(text);
        }
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const user = await signInWithPopup(auth, provider);
            dispatch(changeUser(user.user))
            console.log(user);
            notify('Login success', 'success');
            navigate('/start');
        }
        catch (error) {
            const errorMessage = error.message;
            notify(`Error in login ${errorMessage}`, 'error')
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <GoogleButton
                    onClick={signInWithGoogle}
                />
            </header>
            <ToastContainer />
        </div>
    );
}

export default Home;
