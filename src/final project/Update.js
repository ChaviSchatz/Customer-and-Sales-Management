// import './signup.css'; need to create
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosResponse } from 'axios';
import { urlUsers } from "./endpoints.ts";
import { async } from "q";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redax/actions/usersActions";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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



export function Update(prop) {
    console.log("update", prop)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const findIndexBydetails = (email, password) => {
        return users.findIndex(o => o.email == email && o.password == password);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const users = useSelector((state) => state.usersReducer);

    const onSubmit = async (data) => {
        data.id = prop.details.id;
        const res = axios.put(putUrl, data)
            .then((response) => {
                if (response.status < 299) {
                    debugger
                    dispatch(updateUser(prop.details.emailAddress, prop.details.password
                        , data.emailAddress, data.password));
                    var index = findIndexBydetails(data.emailAddress, data.password);
                    if (index != -1) {
                        console.log(index);
                        navigate(`/helper/${index}`);
                    }
                }
                console.log(response.data)
            })
            .catch((error) => console.log(error));
        reset();
        
    }
    const { index } = useParams();
    const putUrl = urlUsers;
    const userDetail = useSelector((state) => state.usersReducer);



    return (
        <>
            <form class="form-row" onSubmit={handleSubmit(onSubmit)}>
                <div style={{ 'padding': '20px' }}>
                    <div class="form-group col-md-6">
                        <label class="form-label" for="form2Example1">Full name</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="name"
                            {...register('name')}
                            placeholder="Your first name"
                            value={prop.details.name}
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
                            placeholder="Your phoneNumber"
                            value={prop.phoneNumber}
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
                    <div class="form-group col-md-6">
                        <label class="form-label" for="inputCity">City</label>
                        <input id="inputCity" class="form-control"
                            type="text"
                            name="city"
                            {...register('address.city')}
                        />
                        <small className="text-danger">
                            {errors.address?.city && errors.address.city.message}
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="inputAddress">Street</label>
                        <input id="inputAddress" class="form-control"
                            type="text"
                            name="street"
                            {...register('address.street')}
                        />
                        <small className="text-danger">
                            {errors.address?.street && errors.address.street.message}
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="inputAddress">House number</label>
                        <input id="inputAddress" class="form-control"
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

                        <div class="form-group col-md-6">
                            <label class="form-label" for="inputEmail4">Email</label>
                            <input id="inputEmail4" class="form-control"
                                type="email"
                                name="emailAddress"
                                {...register('emailAddress')}
                            />
                            <small className="text-danger">
                                {errors?.emailAddress && errors.emailAddress.message}
                            </small>
                        </div>
                        <div class="form-group col-md-6">
                            <label /*class="form-label"*/ for="inputPassword4">Password</label>
                            <input id="inputPassword4" class="form-control"
                                type="password"
                                name="password"
                                {...register('password')}
                            />
                            <small className="text-danger">
                                {errors?.password && errors.password.message}
                            </small>
                        </div>
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </div>

            </form>
        </>
    );
}