import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import { get, ref } from "firebase/database";

export const Login = () => {
    const navigate = useNavigate ();
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [error, setError] = useState ("");
    
    const dispatch = useDispatch ();

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await signInWithEmailAndPassword (auth, email, password);

            if (response) {
                const userRef = ref(db, `users/${response.user.uid}`);
                const snapshot = await get (userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val ();
                    console.log ("userData", userData)

                    const { firstName, lastName } = userData;
                    dispatch (setUser ({
                        email: response.user.email,
                        id: response.user.uid,
                        accessToken: "",
                        firstName: firstName,
                        lastName: lastName
                    }));
                }
            }
            
            
            setEmail ("");
            setPassword ("");
            setError ("");
            navigate ("/dashboard")
            console.log (response);
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError (error.message);
            } else {
                setError (`Unknown error: ${error}`);
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSignIn}>
                <label>Email: </label>
                <input type="email" onChange={(e) => setEmail (e.target.value)} value={email} required />
                <br></br>
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword (e.target.value)} value={password} required />
                <br></br>
                <button type="submit">Login</button>
            </form>
            <div>
                <h4>Not a member yet? <button onClick={() => navigate("/sign-up")}>Sign Up</button></h4>
            </div>
        </div>
    )
};