/**
 * LoginForm component renders a login form.
 *
 * Allows user to enter username and password.
 * On submit, calls Login function prop to authenticate.
 * Redirects to /companies on success, shows errors on failure.
 * Tracks form data and errors in local state.
 */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

function LoginForm({ Login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  console.debug(
    "LoginForm",
    "login=",
    typeof Login,
    "formData=",
    formData,
    "formErrors",
    formErrors
  );

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await Login(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Log In</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button type="submit" className="btn btn-primary float-right">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
