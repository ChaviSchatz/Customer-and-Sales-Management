import React from "react";
import './login.css';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from 'axios';
import { urlUsers } from "./endpoints.ts";

export function Login() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleRegistration = async (data) => {
        console.log(data.password);
        const res = await axios.get(urlUsers + "/userDetails", {
            body : JSON.stringify({
                email : data.email,
                password : data.password
            })
        })
        console.log(res.data);
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