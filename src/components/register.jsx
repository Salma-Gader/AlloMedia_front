import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Register() {
  const schema = yup.object({
    email: yup.string().email(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: ['user'],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (formData) => {
    sendFormDataToServer(formData);
  };

  const sendFormDataToServer = (formData) => {
    console.log(formData);
    axios
      .post('http://localhost:3000/api/auth/signup', formData)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="username"
            {...register('username', { required: true })}
            onChange={handleInputChange}
          />
          {errors.username && <span className="text-danger">This field is required</span>}
          <input
            type="email"
            placeholder="email"
            {...register('email', { required: true })}
            onChange={handleInputChange}
          />
          {errors.email && <span>This field is required</span>}
          <input
            type="password"
            placeholder="password"
            {...register('password', { required: true })}
            onChange={handleInputChange}
          />
          {errors.password && <span>This field is required</span>}
          <button type="submit">register</button>
          <p className="message">
            Not registered? <a href="/login">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}
