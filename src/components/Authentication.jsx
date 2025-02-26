import { useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Notification from './Notification'
import '../css/Authentication.css'
// import AuthPage from './AuthPage';
const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate();
  const handlechange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   try {
  //     const url = isLoginMode
  //       ? 'http://localhost:3000/api/auth/login'
  //       : 'http://localhost:3000/api/auth/signUp'
  //     const response = await axios.post(url, formData)
  //     localStorage.setItem('token', response.data.token)
  //     // navigate('/todos');
  //   } catch (error) {
  //     console.error('Error:', error.response?.data || error.message)
  //   }
  //   setIsLoginMode(!isLoginMode)
  // }
  
  const handleCurrentSatuation = async (e) => {
    e.preventDefault()
    // just route to the todos page
    if (isLoginMode) {
      navigate('/todos')
    }

    setIsLoginMode(!isLoginMode)
  }
  return (
    <div className='auth__container'>
      <Notification />
      <div className='auth__inner__container'>
        <form action=''>
          <h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
          {!isLoginMode && (
            <div className='inputbox'>
              <input
                type='text'
                name='username'
                onChange={handlechange}
                required
                autoComplete='off'
                spellCheck={false}
                readOnly
                onFocus={e => e.target.removeAttribute('readOnly')}
              />
              <span>Name</span>
              <i></i>
            </div>
          )}
          <div className='inputbox'>
            <input
              type='email'
              name='email'
              onChange={handlechange}
              required
              autoComplete='off'
              spellCheck={false}
              readOnly
              onFocus={e => e.target.removeAttribute('readOnly')}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className='inputbox'>
            <input
              type='password'
              name='password'
              onChange={handlechange}
              required
              autoComplete='off'
              spellCheck={false}
              readOnly
              onFocus={e => e.target.removeAttribute('readOnly')}
            />
            <span>Password</span>
            <i></i>
          </div>
          {!isLoginMode && (
            <div className='inputbox'>
              <input
                type='password'
                name='confirmpassword'
                onChange={handlechange}
                required
                autoComplete='off'
                spellCheck={false}
                readOnly
                onFocus={e => e.target.removeAttribute('readOnly')}
              />
              <span>Confirm Password</span>
              <i></i>
            </div>
          )}
          <div
            className='Btn'
            onClick={e => {
              e.preventDefault()
              setIsLoginMode(!isLoginMode)
            }}
          >
            <a href=''>
              {isLoginMode
                ? `Don't have an account?`
                : `Already have an account?`}{' '}
              <u>{isLoginMode ? `SignUp` : `LogIn`}</u>
            </a>

            <button type='submit' onClick={handleCurrentSatuation}>
              {isLoginMode ? 'logIn' : 'SignUp'}
            </button>
          </div>
        </form>

        <div className='right__container'>
          <h2>Welcome!</h2>
          <p>
            {isLoginMode
              ? 'Log in to access your tasks and stay on top of your goals. Let’s get things done!'
              : 'Organize your life effortlessly. Sign up now and start managing your tasks like a pro!'}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Auth
