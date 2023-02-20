import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiBaseUrl } from "../../api";

const ForogtPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { resetPwdToken } = useParams();

  console.log(resetPwdToken);

  function resetPassword(event) {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setSuccessMessage("");
      setErrorMessage("Passwords must match");
      return;
    }

    fetch(`http://localhost:9003/api/v1/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resetPwdToken}`,
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then(({ status, error, result }) => {
        console.log("reset-password", { status, result, error });
        if (status === "error") {
          // error handling...
          setErrorMessage("Please use only the link from your email");
          return;
        }

        setErrorMessage("");
        setSuccessMessage("Success! Please login now...");
      });
  }

  return (
    <div>
      <form>
        <input
          type="password"
          placeholder="hallo123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button onClick={resetPassword}>Reset Password</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && (
          <>
            <p className="success-message">{successMessage}</p>
            <Link to="/login">Login</Link>
          </>
        )}
      </form>
    </div>
  );
};

export default ForogtPasswordForm;
