import React, { useState, useRef, useEffect } from "react";
import "./verfication.css";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api";
function VerificationCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    inputs.current[0].focus();
  }, []);

  function handleChange(e, index) {
    const value = e.target.value;
    if (isNaN(value) || value === "") {
      return;
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 5 && value !== "") {
      inputs.current[index + 1].focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && index >= 0 && code[index] !== "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      inputs.current[index].value = "";
    }
  }

  function handleVerification() {
    if (code.includes("")) {
      setError(true);
    } else {
      setError(false);
      const verificationCode = code.join("");
      fetch(`${apiBaseUrl}/users/acount-verfication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
      })
        .then((res) => res.json())
        .then(({ status, error }) => {
          if (status === "error") {
            setError(true);
            setErrorMessage(error.message);
            return;
          }
          return navigate("/log-in");
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div id="wrapper">
      <div id="dialog">
        <h3>Please enter the 6-digit verification code we sent via Email:</h3>
        <span>(we want to make sure it's you )</span>
        <div id="form">
          <div className="code-inputs">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                size="1"
                min="0"
                max="9"
                pattern="[0-9]{1}"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
              />
            ))}
          </div>
          <button
            id="login-btn"
            // className="btn btn-primary btn-embossed"
            onClick={handleVerification}
          >
            Verify
          </button>
        </div>

        {error && <div> {errorMessage}</div>}
      </div>
    </div>
  );
}

export default VerificationCode;
