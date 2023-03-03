import React from "react";
// import './signup.css'; need to create
import { useForm } from "react-hook-form";
export function Singup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = (data) => console.log(data);
    const registerOptions = {
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: " Password must have at least 8 characters"
            },

        },
        firstName: { required: "First name is required" },
        lastName: { required: "Last name is required" },
        storeName: { required: "Store name is required" },
        city: { required: "City name is required" },
        street: { required: "street name is required" },
        houseNumber: { required: "House number is required" },
        floor: { required: "floor number is required" },

    }
    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleRegistration)}>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">First name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="firstName"
                        {...register('firstName', registerOptions.firstName)}
                        placeholder="Your first name"
                    />
                    <small className="text-danger">
                        {errors?.firstName && errors.firstName.message}
                    </small>
                </div>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Last name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="lastName"
                        {...register('lastName', registerOptions.lastName)}
                        placeholder="Your last name"
                    />
                    <small className="text-danger">
                        {errors?.lastName && errors.lastName.message}
                    </small>
                </div>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Store name</label>
                    <input id="form2Example1" class="form-control"
                        type="text"
                        name="storeName"
                        {...register('storeName', registerOptions.storeName)}
                        placeholder="Your store name"
                    />
                    <small className="text-danger">
                        {errors?.storeName && errors.storeName.message}
                    </small>
                </div>

        <h3>Shipping address details</h3>
                <div style={{'border': '1px solid black','padding': '20px'}}>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">City</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="city"
                            {...register('city', registerOptions.city)}
                            // Maybe to add a placeHolder
                        />
                        <small className="text-danger">
                            {errors?.city && errors.city.message}
                        </small>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Street</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="street"
                            {...register('street', registerOptions.street)}
                            //Maybe to add a placeHolder
                        />
                        <small className="text-danger">
                            {errors?.street && errors.street.message}
                        </small>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">House number</label>
                        <input id="form2Example1" class="form-control"
                            type="text"
                            name="houseNumber"
                            {...register('houseNumber', registerOptions.houseNumber)}
                            placeholder="House/Apt"
                        />
                        <small className="text-danger">
                            {errors?.houseNumber && errors.houseNumber.message}
                        </small>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form2Example1">Floor</label>
                        <input id="form2Example1" class="form-control"
                            type="number"
                            name="floor"
                            {...register('floor', registerOptions.floor)}
                        />
                        <small className="text-danger">
                            {errors?.floor && errors.floor.message}
                        </small>
                    </div>
                </div>



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