/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';

const GITHUB_CLIENT_ID = '15086237634938d4a94b';
const GITHUB_CLIENT_SECRET = 'd0137205364daf369592f9b5f68eab2de53e8408';
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;

export const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm({
    mode: 'onBlur',
  });


  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

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

  

  const onSubmit = (data) => {
    data.access_id = accessToken;
    fetch('https://auth-qa.qencode.com/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(data)
    })
  };

  return (
    <div className="login">
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
            <input className="input is-large" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
            <p style={{color: 'red'}}>{errors.email?.message}</p>
          </div>
        </div>

        {!errors.email && (
          <div className="field">
            <div className="control">
              <input
                type="password"
                className="input is-large"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Min 8 symbols'
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/,
                    message: 'At least 8 characters and 1 number, lowercase and uppercase letter'
                  }
                })}
              />
              <p style={{ color: 'red' }}>{errors.password?.message}</p>
            </div>
          </div>
        )}

        <button type="submit" className="submit">Log in Qencode</button>
      </form>

      <div className="login-bottom">
        <span className="text">Is your company new to Qencode?</span>
        <a href="/" className="bottom-link">Sign up</a>
      </div>
    </div>
  )
}