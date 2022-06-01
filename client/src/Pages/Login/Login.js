import { useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "../SignUp/signup.css";
import FormInput from "../FormInputs/FormInputs";

const SignUp = () => {
  // useState for the values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // useState for the submit Button
  const [submitted, setSubmitted] = useState(false);

  // static setting for the input values
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  // handles the submit button for a sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    try {
      if (values.email && values.password) {
        // connects to the backend server to set the values
        axios.post("http://localhost:3001/users/login/", values).then(() => {
          console.log("User has logged in!");
        });
      }
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  // setting the values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        {submitted ? (
          <Link to="/home">
            <button>Log In</button>
          </Link>
        ) : (
          <button>Log In</button>
        )}

        <p className="no-account">
          Don't have an account?{" "}
          <Link style={{ marginLeft: ".2rem" }} to="/signup">
            {" "}
            SIGN UP!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
