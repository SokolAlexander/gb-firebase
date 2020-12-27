import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { signup } from "../../services/firebase";

export default function SignUp() {
  const [error, setError] = useState('');
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signup(userValues.email, userValues.password);
    } catch (err) {
      setError(err.message);
    }
  }, [userValues]);

  const handleChangeEmail = useCallback((e) => {
    setUserValues(values => ({ ...values, email: e.target.value }));
  }, [userValues]);

  const handleChangePass = useCallback(
    (e) => {
      setUserValues((values) => ({ ...values, password: e.target.value }));
    },
    [userValues]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChangeEmail}
            value={userValues.email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChangePass}
            value={userValues.password}
            type="password"
          ></input>
        </div>
        <div>
          {error && <p>{error}</p>}
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
