// import './signup.css'; need to create
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { urlUsers } from "./endpoints.ts";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redax/actions/usersActions";
import { useNavigate } from "react-router-dom";
import { getToken } from "./TockenService.js";


const schema = yup.object().shape({
    id: yup.string(),
    orders: yup.array(yup.object()),
    name: yup.string().required(),
    storeName: yup.string(),
    phoneNumber: yup.string().required(),
    address: yup.object().shape({
        city: yup.string().required("city is required"),
        street: yup.string().required("street is required"),
        houseNumber: yup.string().required("houseNumber is required"),
        floor: yup.number().integer().required("floor is required"),
        remarks: yup.string()
    }),
    emailAddress: yup.string().email().required(),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/\d/, 'Password must contain at least one number')
        .required(),
});



export function Update() {
    const [isTokenExpierd, setIsTokenExpierd] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const user = useSelector((state) => state.usersReducer);

    const sendReq = async (data) => {
        debugger
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.put(urlUsers, data, config)
            .then((response) => {
                if (response.status < 299) {
                    dispatch(updateUser(data));
                }
            })
            .then(setIsTokenExpierd(true))
            .catch((error) => { setIsTokenExpierd(false); });
    }

    const onSubmit = async (data) => {
        data.id = user.id;
        debugger
        var config = {
            headers: { Authorization: `Bearer ${getToken()}` }
        };
        await axios.put(urlUsers, data, config)
            .then((response) => {
                if (response.status < 299) {
                    dispatch(updateUser(data));
                    navigate(`/helper/home-page`);
                }
            })
            .then(setIsTokenExpierd(true))
            .catch((error) => {
                console.log("token isnot expired...", error);
            });
    }


    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <>
            <div class="card card-registration my-10">
                <div class="row g-0">
                    <div class="card-body p-md-5 text-black">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <div style={{ "display": "flex" }}>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example1m">שם מלא</label>
                                <input id="form3Example1m" class="form-control"
                                    type="text"
                                    name="name"
                                    {...register('name')}
                                    defaultValue={user.name}
                                // placeholder="Your first name"
                                />
                                <small className="text-danger">
                                    {errors?.name && errors.name.message}
                                </small>
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example1m">פלאפון</label>
                                <input id="form3Example1m" class="form-control"
                                    type="text"
                                    name="phoneNumber"
                                    {...register('phoneNumber')}
                                    defaultValue={user.phoneNumber}
                                // placeholder="Your phone number"
                                />
                                <small className="text-danger">
                                    {errors?.phoneNumber && errors.phoneNumber.message}
                                </small>
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example1m">שם החנות</label>
                                <input id="form3Example1m" class="form-control"
                                    type="text"
                                    name="storeName"
                                    {...register('storeName')}
                                    defaultValue={user.storeName}
                                // placeholder="Your store name"
                                />
                                <small className="text-danger">
                                    {errors?.storeName && errors.storeName.message}
                                </small>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example1m">כתובת מייל</label>
                                <input id="form3Example1m" class="form-control"
                                    type="email"
                                    name="emailAddress"
                                    {...register('emailAddress')}
                                    defaultValue={user.emailAddress}
                                />
                                <small className="text-danger">
                                    {errors?.emailAddress && errors.emailAddress.message}
                                </small>
                            </div>

                            <div class="form-group md-6">
                                <label /*class="form-label"*/ for="inputPassword4">סיסמה</label>
                                <div style={{ display: "flex" }}>
                                    <input id="inputPassword4" class="form-control"
                                        name="password"
                                        {...register('password')}
                                        type={passwordType} onChange={handlePasswordChange}
                                        value={passwordInput}
                                    />
                                    <div className="input-group-btn">
                                        <p className="btn btn-outline-dark" onClick={togglePassword}>
                                            {passwordType === "password" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>}
                                        </p>
                                    </div>
                                </div>

                                <small className="text-danger">
                                    {errors?.password && errors.password.message}
                                </small>
                            </div>
                            <h4>פרטי כתובת למשלוחים</h4>
                            <div style={{ 'borderTop': '1px solid black', 'padding': '15px' }}>
                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <label class="form-label" for="form3Example1m">עיר</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="text"
                                            name="city"
                                            {...register('address.city')}
                                            defaultValue={user.address.city}
                                        // Maybe to add a placeHolder
                                        />
                                        <small className="text-danger">
                                            {errors.address?.city && errors.address.city.message}
                                        </small>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <label class="form-label" for="form3Example1m">רחוב</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="text"
                                            name="street"
                                            {...register('address.street')}
                                            defaultValue={user.address.street}
                                        //Maybe to add a placeHolder
                                        />
                                        <small className="text-danger">
                                            {errors.address?.street && errors.address.street.message}
                                        </small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <label class="form-label" for="form3Example1m">מספר בית</label>
                                        <input dir="rtl" id="form3Example1m" class="form-control"
                                            type="text"
                                            name="houseNumber"
                                            {...register('address.houseNumber')}
                                            placeholder="דירה/בית"
                                            defaultValue={user.address.houseNumber}
                                        />
                                        <small className="text-danger">
                                            {errors.address?.houseNumber && errors.address.houseNumber.message}
                                        </small>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <label class="form-label" for="form3Example1m">קומה</label>
                                        <input id="form3Example1m" class="form-control"
                                            type="number"
                                            name="floor"
                                            {...register('address.floor')}
                                            defaultValue={user.address.floor}
                                        />
                                        <small className="text-danger">
                                            {errors.address?.floor && errors.address.floor.message}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example1m">הערות</label>
                                    <input id="form3Example1m" class="form-control"
                                        type="text"
                                        name="remarks"
                                        {...register('address.remarks')}
                                        defaultValue={user.address.remarks}
                                    />
                                    <small className="text-danger">
                                        {errors.address?.remarks && errors.address.remarks.message}
                                    </small>
                                </div>
                            </div>
                            <button class="btn btn-dark btn-lg btn-block">עדכון</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}