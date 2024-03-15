import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';

export const Login = () => {

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

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
        <a href="/" className="login-btn">
          <img src="./img/github.svg" alt="google" />
          Github
        </a>
      </div>
      <p className="login-line">OR</p>

      <form className="form">
        <input type="email" className="input" placeholder="Work email" />
        <button type="submit" className="submit">Log in Qencode</button>
      </form>

      <div className="login-bottom">
        <span className="text">Is your company new to Qencode?</span>
        <a href="/" className="bottom-link">Sign up</a>
      </div>
    </div>
  )
}