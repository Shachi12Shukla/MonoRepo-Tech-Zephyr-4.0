import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signupUser } from "../services/authService";
import { signupSchema } from "../validators/authValidator";

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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

        const result = signupSchema.safeParse(formData);

        if (!result.success) {

            const fieldErrors = {};

            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });

            setErrors(fieldErrors);

            return;
        }


        try {

            setLoading(true);

            await signupUser(formData);

            toast.success("Character created successfully!");

            navigate("/signin");

        } catch (error) {

            const response = error.response?.data;

            toast.error(
                response?.message || "Signup failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <>

            <div className="auth-form-header">

                <h2>
                    Create Your Character
                </h2>

                <p>
                    Start your journey and build your RPG identity.
                </p>

            </div>


            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <div className="form-row">

                    <div className="form-group">

                        <label htmlFor="firstName">
                            First Name
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Arjun"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        {errors.firstName && (
                            <span className="form-error">
                                {errors.firstName}
                            </span>
                        )}

                    </div>


                    <div className="form-group">

                        <label htmlFor="lastName">
                            Last Name
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Sharma"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        {errors.lastName && (
                            <span className="form-error">
                                {errors.lastName}
                            </span>
                        )}

                    </div>

                </div>


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


                <div className="form-group">

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errors.password && (
                        <span className="form-error">
                            {errors.password}
                        </span>
                    )}

                </div>


                <button
                    className="auth-button"
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "CREATING CHARACTER..."
                        : "⚔ BEGIN ADVENTURE"
                    }

                </button>

            </form>


            <div className="auth-switch">

                Already have an account?{" "}

                <Link to="/signin">
                    Sign in
                </Link>

            </div>

        </>
    );
};

export default Signup;