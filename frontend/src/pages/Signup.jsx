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


        // Frontend validation
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

            /*
                We will navigate to /signin once
                the Signin page is connected.
            */
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
            <h2>Create Your Character</h2>

            <p>
                Start your journey and build your RPG identity.
            </p>
        </div>

        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >

            {/* your existing form fields */}

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