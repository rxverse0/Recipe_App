import React, {useState} from 'react';
import PageTemplate from "../PageTemplate/PageTemplate";
import {NavLink, useNavigate} from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import './login.css';


const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

        return (
            <div className={"LoginMain"}>
                <PageTemplate >
                        <main  >
                            <section>
                            <div className={"LoginBody"}>
                                <h1>WELCOME!</h1>
                                <br/>
                                <h2> Login </h2>

                                <form>
                                    <div className={"emailAddress"}>

                                        <input className={"inputBox"}
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Email address"
                                            onChange={(e)=>setEmail(e.target.value)}

                                        />

                                    </div>

                                    <div>

                                        <input className={"inputBox"}
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="Password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />


                                    </div>

                                    <div>
                                        <button className={"button"}
                                            onClick={onLogin}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>

                                <p className="registerLink">
                                    No account yet? {' '}
                                    <NavLink to="/register">
                                        Sign up
                                    </NavLink>
                                </p>
                            </div>
                        </section>
                        </main>

                </PageTemplate>
            </div>

        );
};


export default LoginPage;
