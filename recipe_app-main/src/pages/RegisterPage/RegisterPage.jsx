import React, {useState} from 'react';
import PageTemplate from "../PageTemplate/PageTemplate";
import {NavLink, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../utils/firebase";
import './register.css';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(0);

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setStatus(1)
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className={"RegisterMain"}>
            <PageTemplate>
            <main >
                <section>
                    <div className={"RegisterBody"}>
                        <div>
                            <h1>WELCOME!</h1>
                            <br/>
                            <h2> Register </h2>
                            <form>
                                <div>

                                    <input className={"inputBox"}
                                        type="email"
                                        label="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email address"
                                    />
                                </div>

                                <div>

                                    <input className={"inputBox"}
                                        type="password"
                                        label="Create password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Password"
                                    />
                                </div>

                                <button className={"button"}
                                    type="submit"
                                    onClick={onSubmit}
                                >
                                    Sign up
                                </button>
                            </form>
                            {status == 0 ? <p></p> : <p>Problem with register</p>
                            }
                            <p className="loginLink" >
                                Already have an account?{' '}
                                <NavLink to="/login" >
                                    Sign in
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </PageTemplate>
        </div>
    );
};

export default RegisterPage;
