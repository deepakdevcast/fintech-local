import { useEffect, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox';
import HeadText from '../components/HeadText';
import { backendSignInCall, verifyToken } from '../api';

function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    verifyToken().then(isSignIn => isSignIn ? navigate('/', { replace: true }) : null);
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const {email, password} = Object.fromEntries(data);
    try {
    const resData = await backendSignInCall(email, password);
    if (resData.token) {
      localStorage.setItem('token', resData.token);
      setErrorMessage('');
      navigate('/dashboard');
    }
    setErrorMessage('Request Failed!');
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <div className="bg-white flex flex-col items-center border shadow-sm p-8 rounded">
        <HeadText text={'Sign In'}/>
        <Form className="flex flex-col py-4" onSubmit={handleSubmit}>
          {/* <input className="py-2 mb-1 border-b-2 focus:outline-none focus:border-blue-600" type="text" placeholder="username" name='username' /> */}
          <InputBox label={'Email'} name={'email'} placeholder={'example@example.com'} type={'email'}/>
          <InputBox label={'Password'} name={'password'} placeholder={'****'} type={'password'}/>
          <button className="inline mt-8 px-3 py-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:border-blue-400" type="submit">Sign In</button>
          <div>Don&apos;t have an account?? <Link to={'/signup'} className='text-blue-600 font-semibold'>Sign Up</Link></div>
          {errorMessage && <div className='text-red-400 font-semibold'>{errorMessage}</div>}
        </Form>
      </div>
    </div>
  );
}

export default SignIn