import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Forgot.css';

const schema = yup.object().shape({
  email: yup.string().email().required(),
}).required();

export const Forgot = () => {
  const { register, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

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
          
        </div>
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
      </div>
      <Link className="submit-btn" to="/reset">Send</Link>
      <Link className="submit-btn submit-btn-cancel" to="/">Cancel</Link>

    </div>
  )
}