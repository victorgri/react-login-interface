import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Forgot.css';

export const Forgot = () => {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="forgot">
      <h1 className="title">Forgot Password</h1>
      <div className="field">
        <div className="control">
          <input
            className="input is-large"
            type="email"
            {...register('email',
              { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            placeholder="Enter your email"
          />
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </div>
      </div>
      <Link className="submit-btn" to="/reset">Send</Link>
      <Link className="submit-btn submit-btn-cancel" to="/">Cancel</Link>

    </div>
  )
}