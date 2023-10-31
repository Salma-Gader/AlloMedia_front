import React from "react";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
export default function Login(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
          ...credentials,
          [name]: value,
        
        });
      };
      const navigate = useNavigate();
      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
    
          if (response.ok) {
            navigate("/home");
            console.log("Login successful");
          } else {
            const data = await response.json();
            if (data && data.message) {
              // Affichez le message d'erreur ici, par exemple en utilisant une alerte
              alert(data.message);
            }
          }

        } catch (error) {
            console.log(error.m);
          
        }
      };

    return (
<div class="login-page">
  <div class="form">
    <form class="login-form" onSubmit={handleLogin}>
      <input type="text" placeholder="username" name="username" onChange={handleInputChange}/>
      <input type="password" placeholder="password" name="password" onChange={handleInputChange}/>
      <button type="submit">login</button>
      <p class="message">Not registered? <a href="/register">Create an account</a></p>
      <p class="message">Not registered? <a href="/forget-password">forget password</a></p>
    </form>
  </div>
</div>
    )
}