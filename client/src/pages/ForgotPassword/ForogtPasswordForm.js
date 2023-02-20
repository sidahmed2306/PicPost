import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../api";
import "./forgetPasswort.css";
const ForogtPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function forgotPassword(event) {
    event.preventDefault();

    fetch(`http://localhost:9003/api/v1/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then(({ status, error }) => {
        if (status === "error") {
          // error handling...
          setErrorMessage(error.message);
          return;
        }

        setSuccessMessage("Success! Please check your inbox...");
      });
  }

  return (
    <div class="container-center">
      <h2>Don't Worry!</h2>
      <form className="foregt-form">
        <h4>
          Just provide your email
          <br />
          and we can do the rest
        </h4>
        <formgroup>
          <input
            className="forget-passwort"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="email">
            <br />
            Email
          </label>
          <span>enter your email</span>
        </formgroup>

        <button id="login-btn" onClick={forgotPassword}>
          Send Me Email
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
      <p>
        Did you remember? <Link to="/log-in">Sign In</Link>
      </p>
      <p>
        Dont't have an account? <Link to="/sign-up">Sign_up</Link>
      </p>
    </div>
  );
};

export default ForogtPasswordForm;
