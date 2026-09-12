import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signinUser } from "../services/authService";
import { signinSchema } from "../validators/authValidator";

import { useAuth } from "../context/AuthContext";


const Signin = () => {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setErrors({});


        // Frontend validation

        const result = signinSchema.safeParse(formData);

        if (!result.success) {

            const fieldErrors = {};

            result.error.issues.forEach((issue) => {

                fieldErrors[issue.path[0]] =
                    issue.message;

            });

            setErrors(fieldErrors);

            return;
        }


        try {

            setLoading(true);


            // Call backend

            const data = await signinUser(formData);


            // Store token and user

            login(
                data.token,
                data.user
            );


            toast.success("Welcome back, hero!");


            // Go to home

            navigate("/home");

        } catch (error) {

            const response =
                error.response?.data;

            toast.error(
                response?.message ||
                "Signin failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <>

            <div className="auth-form-header">

                <h2>
                    Enter Your World
                </h2>

                <p>
                    Sign in to continue your adventure.
                </p>

            </div>


            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                {/* Username */}

                <div className="form-group">

                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="your_username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    {errors.username && (

                        <span className="form-error">
                            {errors.username}
                        </span>

                    )}

                </div>


                {/* Password */}

                <div className="form-group">

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errors.password && (

                        <span className="form-error">
                            {errors.password}
                        </span>

                    )}

                </div>


                {/* Submit */}

                <button
                    className="auth-button"
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "ENTERING WORLD..."
                        : "⚔ ENTER THE WORLD"
                    }

                </button>

            </form>


            <div className="auth-switch">

                New adventurer?{" "}

                <Link to="/signup">
                    Create your character
                </Link>

            </div>

        </>
    );
};


export default Signin;