import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmedPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    phone: yup.string().matches(/^\d{11}$/, "Enter a valid phone number").required("Phone number is required"),
    image: yup.mixed().test("required", "Profile image is required", (value) => value.length > 0),
});


export default function Register() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [preview, setPreview] = useState(null);
    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log("Form Submitted:", data);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmedPassword", data.confirmedPassword);
        formData.append("phone", data.phone);
        formData.append("image", data.image[0]);

        try {
            setApiError(null);
            const response = await axios.post("http://localhost:5000/auth/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Success:", response.data);

            if(response.data.message == "User registered successfully!"){
                navigate('/login')
            }
        } catch (error) {
            console.error("Error:", error);
            setApiError(error.response.data.message)
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setValue("image", e.target.files);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="p-4 shadow-sm rounded-3" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Register</h3>
                {apiError ? <div className='alert alert-danger' role='alert'>{apiError}</div> : ''}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            id="floatingName"
                            {...register("name")}
                            placeholder="Full Name"
                        />
                        <label htmlFor="floatingName" className="text-secondary">Full Name</label>
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            {...register("email")}
                            id="floatingEmail"
                            placeholder="Email"
                        />
                        <label htmlFor="floatingEmail" className="text-secondary">Email</label>
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="tel"
                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                            {...register("phone")}
                            id="floatingPhoneNumber"
                            placeholder="Phone Number"
                        />
                        <label htmlFor="floatingPhoneNumber" className="text-secondary">Phone Number</label>
                        {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            {...register("password")}
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword" className="text-secondary">Password</label>
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.confirmedPassword ? "is-invalid" : ""}`}
                            {...register("confirmedPassword")}
                            id="floatingConfirmPassword"
                            placeholder="Confirm Password"
                        />
                        <label htmlFor="floatingConfirmPassword" className="text-secondary">Confirm Password</label>
                        {errors.confirmedPassword && <div className="invalid-feedback">{errors.confirmedPassword.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Profile image</label>
                        <input
                            type="file"
                            className={`form-control ${errors.image ? "is-invalid" : ""} text-secondary`}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                    </div>

                    {preview && (
                        <div className="text-center mb-3">
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="img-thumbnail"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
