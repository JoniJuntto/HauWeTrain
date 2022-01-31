import './App.css';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import {db, auth} from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'



function Home() {
  const navigate = useNavigate();

  const notify = (text, state) =>{
    if(state === 'success'){
      toast.success(text)
    }else if(state === 'error'){
    toast.error(text);
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      notify('Login success', 'success');
      navigate('/chat');
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
