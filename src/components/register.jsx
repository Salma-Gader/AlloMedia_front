import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
  const schema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    roles: yup.string().required('Role is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   roles: 'user',
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const onSubmit = (formData) => {
  //   console.log(formData)
  //   sendFormDataToServer(formData);
  // };

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post('http://localhost:3000/api/auth/signup', data)
      .then((response) => {
        console.log(response.data.message);
        // alert(response.data.message);
        toast.success('User registered successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
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
            {...register('username', { required: true })}/>
          {errors.username && <span style={{ color: 'red' }}>This field is required</span>}
          <input
            type="email"
            placeholder="email"
            {...register('email', { required: true })}/>
          {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
          <input
            type="password"
            placeholder="password"
            {...register('password', { required: true })}/>
          {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
          <select id='role'
           {...register('roles',{ required: true })}
          >
            <option value="652ff9e1b9a917d7ee073262">User</option>
            <option value="652ff9e1b9a917d7ee073263">Delevry</option>
          </select>
          {errors.roles && <span style={{ color: 'red' }}>{errors.roles.message}</span>}
          <button type="submit">register</button>
          <p className="message">
            Not registered? <a href="/login">Create an account</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
    
  );
}
