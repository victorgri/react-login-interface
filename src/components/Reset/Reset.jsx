import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const Reset = () => {
  const { register, formState: { errors } } = useForm({
    mode: 'onBlur',
  });

  const [passwordType, setPasswordType] = useState('password');
  const [confirm, setConfirm] = useState('password');

  return (
    <>
      <h1 className="title">Create new password</h1>
      <form>
        <div className="field">
          Password
          <div className="control">
            
            <input
              type={passwordType}
              className="input is-large"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Min 8 symbols'
                },
              })}
            />
            <label className="label">
              <input className="checkbox" type="checkbox" onChange={() => passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')} />
              <span className="checkbox-img" />
            </label>
          </div>
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
        </div>
        <div className="field">
          Confirm
          <div className="control">
            
            <input
              type={confirm}
              className="input is-large"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Min 8 symbols'
                },
              })}
            />
            <label className="label">
              <input className="checkbox" type="checkbox" onChange={() => confirm === 'password' ? setConfirm('text') : setConfirm('password')} />
              <span className="checkbox-img" />
            </label>
          </div>
          <p style={{ color: 'red' }}>{errors.password?.message}</p>
        </div>

        <Link to="/" className="submit-btn">Reset password</Link>
      </form>

    </>
  )
}