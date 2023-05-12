import React, { useEffect, useState } from 'react'
import './Login.css'
<<<<<<< Updated upstream
=======
import { Link } from "react-router-dom";
>>>>>>> Stashed changes
import BakerSVG from '/assets/baker-animate.svg';
import Joi from 'joi'
import useApi from '../../hooks/useApi'
import useForm from '../../hooks/useForm'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button';

const schema = Joi.object({
  username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

function Login() {
  const {loading, data, handleRequest } = useApi()
  const form = useForm(schema, { username: '', password: ''})

  const postLogin = async (username, password) => {
    const response = await handleRequest('POST', '/login2', {username, password})
    if (response.success) {
      window.location.replace("http://localhost:5173/Home");
    }
  }

  const handleLogin = () => {
    if(form.validate()){
      postLogin(form.values.username, form.values.password)
    }
  }

  return (
    <div className='loginPage'>
      <div className='loginContainer'>
        <div className='imageContainer'>
          <object className='bakerSVG' type="image/svg+xml" data={BakerSVG}>svg-animation</object>
        </div>
        <div className='formContainer'>
          <h1 className='loginTitle'>Welcome Back!</h1>
          <div className='inputContainer'>
            <Input
              value={form.values.username}
              onChange={form.onChange('username')}
              name="username"
              label="Username"
              type="text"
              required
            />
            <Input
              value={form.values.password}
              onChange={form.onChange('password')}
              name="password"
              placeholder=""
              label="Password"
              type="password"
              required
            />
          </div>
            <Button
            type="primary"
            onClick={handleLogin}
            disabled={
              !form.values.username
              || !form.values.password
            }
            loading={loading}
          >
            Login
          </Button>
          
        </div>
      </div>
    </div>
  )
}

export default Login
