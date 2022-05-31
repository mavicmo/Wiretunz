import axios from "axios";
import { useState } from "react";

function Login() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(true);
  const [valid, setValid] = useState(false);
  const handleFirstNameInputChange = (event) => {
    setValues({ ...values, firstName: event.target.value });
  };

  const handleLastNameInputChange = (event) => {
    setValues({ ...values, lastName: event.target.value });
  };

  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };
  const handlePasswordInputChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.password
    ) {
      setValid(true);
      axios.post("http://localhost:3001/users/login", values).then(() => {
        console.log("login");
      });
    }
    setSubmitted(true);
  };
  return (
    <div className="form-container">
      <form className="Sign-in-form" onSubmit={handleSubmit}>
        <h1> WireTunz Login</h1>

        {submitted && valid ? (
          <div className="Successful! Start Listening"></div>
        ) : null}

        <input
          onChange={handleFirstNameInputChange}
          value={values.firstName}
          className="form-field"
          placeholder="First Name"
          name="firstName"
        />
        {submitted && !values.firstName ? <span>Enter First Name</span> : null}

        <input
          onChange={handleLastNameInputChange}
          value={values.lastName}
          className="form-field"
          placeholder="Last Name"
          name="LastName"
        />
        {submitted && !values.lastName ? <span>Enter Last Name</span> : null}

        <input
          onChange={handleEmailInputChange}
          value={values.email}
          className="form-field"
          placeholder="email"
          name="email"
        />
        {submitted && !values.email ? <span>Enter Email Name</span> : null}
        <button className="form-field" type="submit">
          Sign In
        </button>

        <input
          onChange={handlePasswordInputChange}
          value={values.password}
          className="form-field"
          placeholder="password"
          name="password"
        />
        {submitted && !values.password ? <span>Enter Password</span> : null}
      </form>
    </div>
  );
}

export default Login;
