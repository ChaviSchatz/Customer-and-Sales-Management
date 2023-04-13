import React from "react";
import './login.css';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from 'axios';
import { urlUsers } from "./endpoints.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleRegistration = async (d) => {
        const postUrl = urlUsers + "/userDetails";
        const obj = {
            password : d.password,
            email : d.email
            }
        console.log(obj);
        const res = await axios.post(postUrl, obj);
        console.log(res.data);
        navigate("/home");

    }
    
    const registerOptions = {
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleRegistration)}>
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
            </form>
            
        </>
    );
}