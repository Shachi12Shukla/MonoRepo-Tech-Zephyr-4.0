import { Link } from "react-router-dom";

const Signin = () => {

    return (
    <>
        <div className="auth-form-header">

            <h2>Enter Your World</h2>

            <p>
                Sign in to continue your adventure.
            </p>

        </div>

        <form className="auth-form">

            {/* existing inputs */}

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