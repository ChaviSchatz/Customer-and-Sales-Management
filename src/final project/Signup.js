// import './signup.css'; need to create
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosResponse } from 'axios';
import { urlUsers } from "./endpoints.ts";
import { async } from "q";
import { useDispatch } from "react-redux";
import { pushNewUser } from "./redax/actions/usersActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



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



export function Singup() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer);
    const navigate = useNavigate();
    // const findIndexBydetails = (email, password) => {
    //     return users.findIndex(o => o.email == email && o.password == password);
    // }


    const onSubmit = async (data) => {
        debugger
        data.id = "";
        console.log(users);
        const res = async (data) => {
            await axios.post(urlUsers, data)
                .then((response) => {

                    if (response.status < 300) {
                        console.log("good luck!");
                    }
                    else {
                        console.log("the http request faild");

                    }
                })
                .catch((error) => console.log(error));
            console.log("pass to the second post...");
            await axios.post(urlUsers, { email: data.email, password: data.password })
                .then((response) => {
                    if (response.status < 300) {
                        dispatch(pushNewUser(response.data));
                    }
                })
                .catch((error) => console.log(error));

        }
        reset();
        navigate(`/home-page`);

    }
    // ךהוציא את הפוסט הפנימי לבחוץ ולבדוק שהיוזר נכנס לקומפס



    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Full name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="name"
                        {...register('name')}
                        placeholder="Your first name"
                    />
                    <small className="text-danger">
                        {errors?.name && errors.name.message}
                    </small>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Phone number</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="phoneNumber"
                        {...register('phoneNumber')}
                        placeholder="Your first name"
                    />
                    <small className="text-danger">
                        {errors?.phoneNumber && errors.phoneNumber.message}
                    </small>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Store name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="storeName"
                        {...register('storeName')}
                        placeholder="Your store name"
                    />
                    <small className="text-danger">
                        {errors?.storeName && errors.storeName.message}
                    </small>
                </div>

                <h3>Shipping address details</h3>
                <div style={{ 'border': '1px solid black', 'padding': '20px' }}>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">City</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="city"
                            {...register('address.city')}
                        // Maybe to add a placeHolder
                        />
                        <small className="text-danger">
                            {errors.address?.city && errors.address.city.message}
                        </small>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Street</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="street"
                            {...register('address.street')}
                        //Maybe to add a placeHolder
                        />
                        <small className="text-danger">
                            {errors.address?.street && errors.address.street.message}
                        </small>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">House number</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="houseNumber"
                            {...register('address.houseNumber')}
                            placeholder="House/Apt"
                        />
                        <small className="text-danger">
                            {errors.address?.houseNumber && errors.address.houseNumber.message}
                        </small>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Floor</label>
                        <input id="form2Example1" class="form-control"
                            type="number"
                            name="floor"
                            {...register('address.floor')}
                        />
                        <small className="text-danger">
                            {errors.address?.floor && errors.address.floor.message}
                        </small>
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Remarks</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="remarks"
                            {...register('address.remarks')}
                        />
                        <small className="text-danger">
                            {errors.address?.remarks && errors.address.remarks.message}
                        </small>
                    </div>
                </div>



                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Email</label>
                    <input id="form2Example1" class="form-control"
                        type="email"
                        name="emailAddress"
                        {...register('emailAddress')}
                    />
                    <small className="text-danger">
                        {errors?.emailAddress && errors.emailAddress.message}
                    </small>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">Password</label>
                    <input id="form2Example2" class="form-control"
                        type="password"
                        name="password"
                        {...register('password')}
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