import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import authApi from "../utils/auth";

export default function Login(props) {
  const [formInput, setFormInput] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const { handleClosePopup, popupRef, handleLogin, isLoginPopupActive} = props;

  
  const navigate = useNavigate();
  
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setFormInput(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const regexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // VALIDATE EMAIL
  const validateEmail = (email) => {
    if (email && email.length > 0) {
      return regexEmail.test(email) ? '' : 'Please enter a valid email address.'
    }
  }
  
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  // VALIDATE PASSWORD
  const validatePassword = (password) => {
    if (password && password.length > 0) {
      return regexPassword.test(password) ? '' : 'Password must be between 4 and 8 digits long and include at least one numeric digit.'
    }
  }

  // CREATE INPUTS
  const inputs = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'EMAIL',
      required: true,
      errorMessage: validateEmail(formInput.email),
      className: 'login__input',
      value: formInput.email,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'PASSWORD',
      required: true,
      errorMessage: validatePassword(formInput.password),
      className: 'login__input',
      value: formInput.password
    }
  ]

  // CLEAR INPUTS
  const clearInputs = () => {
    setTimeout(() => {
      setFormInput({
        email: '',
        password: '',
      })
    },500)  // DELAY SO USER DOESN'T SEE INPUT CHANGING
       
  }

  // HANDLE CLOSE POPUP
  const closePopup = () => {
    handleClosePopup();
    clearInputs();
  }

  useEffect(() => {
    if(formInput.email && formInput.password) {
      setIsFormValid(true)
    }
  }, [formInput])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = await authApi.signIn(formInput)
      
      // CLEAR INPUTS
      clearInputs()

      // NO TOKEN RETURNED
      if(!token) {throw new Error('could not sign in')}
      
      localStorage.setItem('token', token)
      handleLogin(localStorage.getItem('token'))
      return;
    } catch(err){console.error(err)}
  }

  return (
    <div className={isLoginPopupActive ? 'login' : 'login login_inactive'}>
      <form className='login__form' ref={popupRef} onSubmit={handleSubmit}>
        <button className='login__close-btn' onClick={closePopup}>CLOSE</button>
        <h2 className='login__title'>SIGN IN</h2>
        {inputs.map((input) => (
          <>
            <input name={input.name} value={input.value}type={input.type} placeholder={input.placeholder} required={input.required} className={input.className} onChange={handleInput} />
            <span style={{color: 'darkslategrey', fontWeight: 200}}>{input.errorMessage}</span>
          </>
        ))}
        {/* <p className='login__paragraph'>Not a member? <a onClick={() => navigate('/register')} className='login__link'>Sign up now</a></p> */}
        <button type='submit' className={isFormValid ? 'login__button' : 'login__button login__button_inactive'}>ENTER</button>
      </form>
    </div>
  )
}