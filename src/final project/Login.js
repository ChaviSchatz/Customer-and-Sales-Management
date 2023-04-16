import React from "react";
import './login.css';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const users = useSelector((state) => state.usersReducer);
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const findIndexBydetails = (email, password) => {
        return users.findIndex(o => o.email == email && o.password == password);
    }

    const handleRegistration = async (d) => {
       var index = findIndexBydetails(d.email, d.password);
       if(index!=-1){
        navigate(`/home/${index}`);
       }
       else{
        
       }
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
                <Link to="Signup">משתמש חדש? הרשם כאן</Link>
            </form>
            
        </>
    );
}