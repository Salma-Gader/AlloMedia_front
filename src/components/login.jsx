import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

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
      await schema.validate(credentials, { abortEarly: false });

      // Validation passed, proceed with the login request
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        navigate('/home');
        console.log('Login successful');
      } else {
        const data = await response.json();
        if (data && data.message) {
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const validationErrors = {};
        validationError.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
          {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
          <input
            type="password"
            placeholder="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          {errors.password && <span style={{ color: 'red' }}className="text-danger">{errors.password}</span>}
          <button type="submit">login</button>
          <p className="message">Not registered? <a href="/forget-password">Forgot password</a></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
