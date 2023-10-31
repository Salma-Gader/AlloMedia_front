import React, { useState } from "react";
import axios from 'axios';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = async() => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/forget-password', {
                email: email,
            });

            if (response.status === 200) {
                setMessage(response.data.message);
            } else {
                setMessage('Password reset link could not be sent');
            }
        } catch (error) {
            setMessage('Internal server error');
            console.error(error);
        }
    };

    return ( 
    <div className = "forgetPassword-page" >
        <div className = "form" >
        <form className = "login-form" >
            <input type = "text"
            placeholder = "email"
            name = "email"
            onChange = {
                (e) => setEmail(e.target.value)
            }
            /> 
            <button type = "submit"
               onClick = { handlePasswordReset } > Submit 
            </button> 
            <p> { message } </p> 
        </form> 
        </div > 
    </div>
    );
    }