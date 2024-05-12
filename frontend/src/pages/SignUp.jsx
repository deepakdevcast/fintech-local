import { useEffect, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom'
import InputBox from '../components/InputBox';
import HeadText from '../components/HeadText';
import { backendSignUpCall, verifyToken } from '../api';

function SignUp() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    verifyToken().then(isSignIn => isSignIn ? navigate('/', { replace: true }) : null);
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    const {username, email, password, cPassword} = Object.fromEntries(data);
    console.log({username, email, password, cPassword});
    if (password!== cPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    try {
      const data = await backendSignUpCall(username, email, password);
      setErrorMessage(data.message);
      navigate('/signin');
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <div className="bg-white flex flex-col items-center border shadow-sm p-8 rounded">
        <HeadText text={'Sign Up'}/>
        <Form className="flex flex-col py-4" onSubmit={handleSubmit}>
          <InputBox label={'Username'} name={'username'} placeholder={''} type={'text'}/>
          <InputBox label={'Email'} name={'email'} placeholder={'example@example.com'} type={'email'}/>
          <InputBox label={'Password'} name={'password'} placeholder={'****'} type={'password'}/>
          <InputBox label={'Confirm Password'} name={'cPassword'} placeholder={'****'} type={'password'}/>
          <button className="inline mt-8 px-3 py-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:border-blue-400" type="submit">Sign Up</button>
          <div>Already have an account? <Link to={'/signin'} className='text-blue-600 font-semibold'>Sign In</Link></div>
          {errorMessage && <div className='text-red-400 font-semibold'>{errorMessage}</div>}
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
