import React, { useState } from "react";
import { useLocation } from "react-router";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent the form from submitting by default

    try {
      const response = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, token }),
      });

      if (response.ok) {
        setMessage("Password reset successful.");
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage("Internal server error");
    }
  };

  return (
    <div className="resetPassword-page">
      <div className="form">
        <form className="login-form" onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}
