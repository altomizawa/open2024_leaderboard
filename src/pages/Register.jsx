import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import authApi from "../utils/auth";

export default function Register(props) {
  const [input, setInput] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const { handleClosePopup } = props;

  
  const navigate = useNavigate();
  
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // VALIDATE NAME
  const validateName = (name) => {
    const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (name && name.length<4) {
      return regexName.test(name)&&name.length>4 ? '' : 'Invalid name. Please ensure it only has letter and spaces'
    }
  }
  
  // VALIDATE EMAIL
  const validateEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email) {
      return regexEmail.test(email) ? '' : 'Please enter a valid email address.'
    }
  }
  
  // VALIDATE PASSWORD
  const regexPassword = /^(?=.*\d).{4,8}$/;
  const validatePassword = (password) => {
    if (password && password.length > 0) {
      return regexPassword.test(password) ? '' : 'Password must be between 4 and 8 digits long and include at least one numeric digit.'
    }
  }

  // CHECK IF PASSWORDS MATCH 
  const doPasswordsMatch = (password, confirmPassword) => {
    if(confirmPassword) {
      return password === confirmPassword ? '' : 'Passwords do not match'
    } else {return ''}
  }

  // CREATE INPUTS
  const inputs = [
    {
      name: 'name',
      type: 'string',
      placeholder: 'FULL NAME',
      required: true,
      errorMessage: validateName(input.name),
      className: 'login__input',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'EMAIL',
      required: true,
      errorMessage: validateEmail(input.email),
      className: 'login__input',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'PASSWORD',
      required: true,
      errorMessage: validatePassword(input.password),
      className: 'login__input',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'CONFIRM PASSWORD',
      required: true,
      errorMessage: doPasswordsMatch(input.password, input.confirmPassword),
      className: 'login__input',
    }
  ]

  useEffect(() => {
    if(input.email && input.password && input.confirmPassword && input.password===input.confirmPassword) {
      setIsFormValid(true)
    } else {setIsFormValid(false)}
  }, [input])

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const newUser = await authApi.createUser(input)
      if (!newUser) {
        return console.log('user not created')
      }
      navigate('/admin');
      handleClosePopup();
      return;
    } catch(err){console.error('user already in database', err.message)}
  }

  return (
    <div className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <h2 className='login__close-btn' onClick={handleClosePopup}>X</h2>
        <h2 className='login__title'>SIGN UP</h2>
        {inputs.map((input) => (
          <>
            <input key={input.name} name={input.name} type={input.type} placeholder={input.placeholder} required={input.required} className={input.className} onChange={handleInput} autoComplete='true' />
            <span style={{color: 'grey', fontWeight: 200}}>{input.errorMessage}</span>
          </>
        ))}
        <p className='login__paragraph'>Not a member? <a className='login__link'>Sign up now</a></p>
        <button type='submit' className={isFormValid ? 'login__button' : 'login__button login__button_inactive'}>ENTER</button>
        <h2 className='login__background-type'>SIGN UP</h2>
      </form>
    </div>
  )
}