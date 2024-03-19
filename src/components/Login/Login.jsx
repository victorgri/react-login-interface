/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';
import { Link } from 'react-router-dom';


// Data to login with github
const GITHUB_CLIENT_ID = '15086237634938d4a94b';
const GITHUB_CLIENT_SECRET = 'd0137205364daf369592f9b5f68eab2de53e8408';
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
}).required();


export const Login = () => {
  const {
    register,
    formState: { errors }, 
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [inputType, setInputType] = useState('password');

// Function to login with google
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  // Function to login with github
  const handleLogin = async (code) => {
    try {
      const data = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
                  'Content - Type': 'application / json'
            }
      }).then((response) => response.json());

const accessToken = data.access_token;

const userProfile = await fetch('https://api.github.com/user', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'User-Agent': 'Your-App-Name'
  }
});

console.log(`Welcome, ${userProfile.data.name}!`);
    } catch (error) {
  console.error(error);
}
  };

  const handleGitHubCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    if (code) {
      handleLogin(code);
    }
  };

  useEffect(() => {
    handleGitHubCallback();
  }, []);

  
  // Function to login wish email and password
  const onSubmit = (data) => {
    fetch('https://auth-qa.qencode.com/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) {
        alert('Something went wrong')
        } else {
          alert('Succefuly logged in')
        }
    })
  };

  return (
    <div className="login">
      <h1 className="title">Log in to your account</h1>
      <div className="login-top">
        <a
          href="/"
          className="login-btn"
          onClick={() => login()}
        >
          <img src="./img/google.svg" alt="google" />
          Google
        </a>
        <a
          href={githubOAuthURL}
          className="login-btn"
        >
          <img src="./img/github.svg" alt="google" />
          Github
        </a>
      </div>
      <p className="login-line">OR</p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <div className="control">
            <input
            className="input is-large"
              type="email"
            placeholder="Email"
              {...register('email',
                {
                  required: 'Email is required',
                })}
            />
            {errors.mail ? <p role="alert">{errors.mail.message}</p> : ''}
          </div>
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>
        

        {!errors.email && (
          <div className="field">
            <div className="control">
              <input
                type={inputType}
                className="input is-large"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Min 8 symbols'
                  },
                  pattern: {
                    value: '/[A-Z0-9a-z@]^[$#<>?]/',
                    message: 'Wrong email format'
                  }
                })}
              />
              <label className="label">
                <input className="checkbox" type="checkbox" onChange={() => inputType === 'password'? setInputType('text') : setInputType('password')}/>
                <span className="checkbox-img"/>
              </label>

            </div>
            <Link className="input-link" to="/forgot" >Forgot your password?</Link>
            <p style={{ color: 'red' }}>{errors.password?.message}</p>
          </div>
          
          


        )}

        <button type="submit" className="submit">Log in to Qencode</button>
      </form>

      <div className="login-bottom">
        <span className="text">Is your company new to Qencode?</span>
        <a href="/" className="bottom-link">Sign up</a>
      </div>
    </div>
  )
}