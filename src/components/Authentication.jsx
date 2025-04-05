import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import '../css/Authentication.css'
const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const handlechange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isLoginMode) {
      const { email, password } = formData
      if (formData.email === '' || formData.password === '') {
        alert('Please fill in all fields!')
        return
      }
      const FormData = {
        email: email,
        password: password
      }
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/logIn',
          FormData
        )
        console.log(response.data)
        console.log('Login successful!')
        localStorage.setItem('email', FormData.email)
        const localEmail = localStorage.getItem('email')
        if (!localEmail) {
          alert('Please log in again!') 
          return
        }else{
          navigate(`/todos/${localEmail}`) 
        }
        // same email in localstorage
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert(error.response.data.message) // Show alert for invalid credentials
        } else {
          alert('An error occurred. Please try again.')
        }
        console.error('Error:', error.response?.data || error.message)
      }
    } else {
      // if formdata is empty
      if (
        formData.name === '' ||
        formData.email === '' ||
        formData.password === ''
      ) {
        alert('Please fill in all fields!')
        return
      }
      // if password and confirm password is not same
      const { name, email, password, confirmPassword } = formData
      if (password !== confirmPassword) {
        alert('Passwords do not match!')
        return
      } else {
        let FormData = {
          name: name,
          email: email,
          password: password
        }
        try {
          const response = await axios.post(
            'http://localhost:3000/api/auth/signUp',
            FormData
          )
          console.log(response.data)
        } catch (error) {
          console.error('Error:', error.response?.data || error.message)
        }
        setIsLoginMode(!isLoginMode)
      }
    }
    // try {
    //   const url = isLoginMode
    //     ? 'http://localhost:3000/api/auth/login'
    //     : 'http://localhost:3000/api/auth/signUp'
    //   const response = await axios.post(url, FormData)
    //   console.log(response.data)

    //   // Redirect to the todos page after successful login/signup
    //   if (isLoginMode) {
    //     navigate('/todos')
    //   } else {
    //     setIsLoginMode(!isLoginMode)
    //   }
    // } catch (error) {
    //   console.error('Error:', error.response?.data || error.message)
    // }
    // setIsLoginMode(!isLoginMode)
  }

  // const handleCurrentSatuation = async () => {

  //   // just route to the todos page
  //   if (isLoginMode) {
  //     navigate('/todos')
  //   }

  //   setIsLoginMode(!isLoginMode)
  // }
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
                name='name'
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
                name='confirmPassword'
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
          <div className='Btn'>
            <a
              href=''
              onClick={e => {
                e.preventDefault()
                setIsLoginMode(!isLoginMode)
              }}
            >
              {isLoginMode
                ? `Don't have an account?`
                : `Already have an account?`}{' '}
              <u>{isLoginMode ? `SignUp` : `LogIn`}</u>
            </a>
            <button type='submit' onClick={handleSubmit}>
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
