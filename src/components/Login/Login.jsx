import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';


const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});


export default function Login() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [apiError, setApiError] = useState(null);
    let navigate = useNavigate();
    let {setToken} = useContext(TokenContext);

    const onSubmit = async (data) => {
        console.log("Form login:", data);

        const formData = {
            email: data.email,
            password: data.password,
        };

        try {
            setApiError(null);
            const response = await axios.post("http://localhost:5000/auth/login", formData);
            console.log("Success:", response.data);

            if(response.data.message == "logged in successfully!"){
                localStorage.setItem("userToken", response.data.token);
                setToken(response.data.token);
                navigate('/home')
            }
        } catch (error) {
            console.error("Error:", error);
            setApiError(error.response.data.message)
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="p-4 shadow-sm rounded-3" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Login</h3>
                {apiError ? <div className='alert alert-danger' role='alert'>{apiError}</div> : ''}
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            {...register("password")}
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label htmlFor="floatingPassword" className="text-secondary">Password</label>
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
