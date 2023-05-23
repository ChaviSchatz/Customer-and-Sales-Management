import React, { useState } from "react";
import './cssFiles/login.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";
import { pushNewUser } from "./redax/actions/usersActions";


export function Login() {
    const navigate = useNavigate();
    // const user = useSelector((state) => state.usersReducer);
    const [UserAuthentication, setUserAuthentication] = useState(true);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleRegistration = async (d) => {
        await axios.post(urlUsers + "/-", d)
            .then((response) => {
                if (response.status < 300) {
                    debugger
                    const userData = response.data;
                    if (userData != "") {
                        if (userData.password == "011920246") {
                            navigate(`/orders`);
                        }
                        else {
                            dispatch(pushNewUser(userData));
                            navigate(`/home-page`);
                        }
                    }
                    else {
                        setUserAuthentication(false);
                    }
                }
                else {
                    // setserverError(true);
                    console.log("the http request faild");
                }
            })
            .catch((error) => console.log(error));
    }

    const registerOptions = {
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
        }
    };

    return (
        <>
            <section class="vh-100" style={{"width": "90%", "margin" : "auto"}}>
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                class="img-fluid" alt="Sample image" />
                        </div>
                        <div class="col-md-4 col-lg-2 col-xl-4 offset-xl-1">
                            <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <form className="form" onSubmit={handleSubmit(handleRegistration)} style={{"width": "90%"}}>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form2Example1">Email</label>
                                        <input id="form2Example1" class="form-control"
                                            type="email"
                                            name="email"
                                            {...register('email', registerOptions.email)}
                                        />
                                        <small className="text-danger">
                                            {errors?.email && errors.email.message}
                                        </small>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form2Example2">Password</label>
                                        <input id="form2Example2" class="form-control"
                                            type="password"
                                            name="password"
                                            {...register('password', registerOptions.password)}
                                        />
                                        <small className="text-danger">
                                            {errors?.password && errors.password.message}
                                        </small>
                                    </div>
                                    <button class="btn btn-primary btn-block mb-4">Submit</button>
                                    {UserAuthentication == false &&
                                        <small className="text-danger">
                                            שם משתמש או סיסמא שגויים, נסה שוב
                                        </small>}
                                    <br></br>
                                    <Link to="Signup">משתמש חדש? הרשם כאן</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-1 px-4 px-xl-5 bg-primary">
                    <div class="text-white mb-3 mb-md-0">
                        {/* <p>פניות טכניות: 0504254269</p> */}
                    </div>
                </div>
            </section>
        </>
    );
}