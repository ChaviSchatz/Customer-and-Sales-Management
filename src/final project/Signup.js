// import './signup.css'; need to create
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    storeName: yup.string(),
    address: yup.object().shape({
        city: yup.string().required("city is required"),
        street: yup.string().required("street is required"),
        houseNumber: yup.string().required("houseNumber is required"),
        floor: yup.number().required("floor is required"),
    }),
    email: yup.string().email().required(),
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
    const onSubmit = (data) => {
        console.log(data);
        reset();
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">First name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="firstName"
                        {...register('firstName')}
                        placeholder="Your first name"
                    />
                    <small className="text-danger">
                        {errors ?.firstName && errors.firstName.message}
                    </small>
                </div>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Last name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="lastName"
                        {...register('lastName')}
                        placeholder="Your last name"
                    />
                    <small className="text-danger">
                        {errors ?.lastName && errors.lastName.message}
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
                        {errors ?.storeName && errors.storeName.message}
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
                </div>



                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Email</label>
                    <input id="form2Example1" class="form-control"
                        type="email"
                        name="email"
                        {...register('email')}
                    />
                    <small className="text-danger">
                        {errors ?.email && errors.email.message}
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
                        {errors ?.password && errors.password.message}
                    </small>
                </div>
                <button class="btn btn-primary btn-block mb-4">Submit</button>
            </form>
        </>
    );
}