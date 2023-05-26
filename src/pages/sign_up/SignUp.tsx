import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase/firebase.config";
import { FirebaseError } from "firebase/app";
import { ref, set } from "firebase/database";

export const SignUp = () => {
    const navigate = useNavigate ();
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [firstName, setFirstName] = useState ("");
    const [lastName, setLastName] = useState ("");
    const [error, setError] = useState ("");

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword (auth, email, password);
            
            if (response) {
                const userRef = ref (db, `users/${response.user.uid}`);
                set (userRef, {
                    email: response.user.email,
                    firstName: firstName,
                    lastName: lastName
                });
            }
            setError ("");
            setEmail ("");
            setPassword ("");
            navigate ("/");
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
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>Name: </label>
                <input type="text" required onChange={(e) => setFirstName (e.target.value)} value={firstName}/>
                <br></br>
                <label>Last name: </label>
                <input type="text" required onChange={(e) => setLastName (e.target.value)} value={lastName}/>
                <br></br>
                <label>Email: </label>
                <input type="email" onChange={(e) => setEmail (e.target.value)} value={email} required />
                <br></br>
                <label>Password:</label>
                <input type="password" onChange={(e) => setPassword (e.target.value)} value={password} required />
                <br></br>
                {
                    error && <label style={{color: "red"}}>{error}</label>
                }
                <button type="submit">Sign Up</button>
            </form>
            <div>
                <h4>Already have an account? <button onClick={() => navigate("/")}>Log In</button></h4>
            </div>
        </div>
    )
};