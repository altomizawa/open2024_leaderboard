import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import authApi from "../utils/auth";

import ErrorBox from "../components/ErrorBox";
import SuccessBox from '../components/SuccessBox'

export default function Login(props) {
  const [formInput, setFormInput] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [isErrorBoxActive, setIsErrorBoxActive] = useState(false)
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false)

  const { handleClosePopup, popupRef, handleLogin, isLoginPopupActive} = props;

  
  const navigate = useNavigate();
  
  const regexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setFormInput(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  // VALIDATE EMAIL
  const validateEmail = (email) => {
    if (email && email.length > 0) {
      return regexEmail.test(email) ? '' : 'Please enter a valid email address.'
    }
  }
  
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
    setIsErrorBoxActive(false)
  }

  useEffect(() => {
    if(validateEmail(formInput.email)=='' && validatePassword(formInput.password)==='') {
      setIsFormValid(true)
    }
  }, [formInput])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      // CLEAR INPUTS
      clearInputs()

      const token = await authApi.signIn(formInput)

      // NO TOKEN RETURNED
      if(!token) {
        throw new Error('could not sign in')
      }
      // TOKEN RETURNED SET LOCAL STORAGE
      localStorage.setItem('token', token)
      
      // CLOSE ERRORPOPUP IS ACTIVE
      setIsErrorBoxActive(false)

      // LOGIN USING TOKEN
      handleLogin(localStorage.getItem('token'))

      // DISPLAY LOGIN SUCCESSFUL MESSAGE
      setIsLoginSuccessful(true)
      return;
    } catch(err){
      setIsErrorBoxActive(true)
      console.error(err)}
  }

  return (
    <div className={isLoginPopupActive ? 'login' : 'login login_inactive'}>
      {isLoginSuccessful && <SuccessBox setIsLoginSuccessful={setIsLoginSuccessful} closePopup={closePopup}/>}
      <form className='login__form' onSubmit={handleSubmit}>
        <button type='button' className='login__close-btn' onClick={closePopup}>CLOSE</button>
        <h2 className='login__title'>SIGN IN</h2>
        {inputs.map((input) => (
          <React.Fragment key={input.name}>
            <input name={input.name} value={input.value}type={input.type} placeholder={input.placeholder} required={input.required} className={input.className} onChange={handleInput} />
            <span style={{color: 'darkslategrey', fontWeight: 200}}>{input.errorMessage}</span>
          </React.Fragment>
        ))}
        <p className='login__paragraph'>Not a member? <a onClick={() => navigate('/register')} className='login__link'>Sign up now</a></p>
        <button type='submit' className={isFormValid ? 'login__button' : 'login__button login__button_inactive'}>ENTER</button>
        {isErrorBoxActive && <ErrorBox type='login'/>}
      </form>
    </div>
  )
}